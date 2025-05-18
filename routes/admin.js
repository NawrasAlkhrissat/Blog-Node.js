const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWTSECRET;
const adminLayout = '../views/layouts/admin';


const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}




router.get('/admin', async (req, res) => {
    try {
        res.render('admin/index', { layout: adminLayout });
    } catch (err) {
        console.log(err);
    }
});

router.post('/admin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(401).json({ message: 'invalid Username or password' });
        }
        const ispasswordValid = await bcrypt.compare(password, user.password);
        if (!ispasswordValid) {
            return res.status(401).json({ message: 'invalid Username or password' });
        }
        const token = jwt.sign({ userId: user._id }, jwtSecret);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
    }
});

router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
        const data = await Post.find();
        res.render('admin/dashboard', { data, layout: adminLayout });

    } catch (err) {
        console.log(err)
    }
});
router.get('/add-post', authMiddleware, async (req, res) => {
    try {
        res.render('admin/add-post', { layout: adminLayout })
    } catch (err) {
        console.log(err)
    }
});
router.post('/add-post', authMiddleware, async (req, res) => {
    try {

        try {
            const newPost = new Post({
                title: req.body.title,
                body: req.body.body,
                createdAt: Date.now()
            });
            await Post.create(newPost);
            res.redirect('/dashboard')
        } catch (err) {
            console.log(err)
        }
    } catch (err) {
        console.log(err)
    }
});
router.get('/edit-post/:id', authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Post.findById(id);
        res.render('admin/edit-post', { data, layout: adminLayout });
    } catch (err) {
        console.log(err);
    }
});
router.put('/edit-post/:id', authMiddleware, async (req, res) => {
    try {

        const id = req.params.id;
        await Post.findByIdAndUpdate(id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now(),
        });

        res.redirect('/dashboard');
    } catch (err) {
        console.log(err)
    }
});

router.delete('/delete-post/:id', authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        await Post.findByIdAndDelete(id);
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
    }
});

router.get('/logout', async (req, res) => {
    try {
        res.clearCookie('token');
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
});


// router.post('/register', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         if (!password) {
//             return res.status(400).send('Password is required');
//           }
//        const hashedPassword = await bcrypt.hash(password,10);
//         try {
//             const user = await User.create({username, password: hashedPassword});
//             res.status(201).json({message: 'User Created',user});
//         } catch (err) {
//             if(err.code ===11000){
//                 res.status(409).json({message: 'user already in use'});
//             }
//             res.status(500).json({message: 'Server Error'});
//         }
//     } catch (err) {
//         console.log(err);
//     }
// });


module.exports = router;