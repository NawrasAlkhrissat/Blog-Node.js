const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');

router.get('/', async (req, res) => {
    try {
        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', {
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute : '/'
        });
    } catch (err) {
        console.log(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        let Slug = req.params.id;
        const data = await Post.findById({ _id: Slug });
        res.render('post', { data ,currentRoute : `/post/${Slug}`});
    } catch (err) {
        console.log(err);
    }
})


router.post('/search', async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        let searchNoSpecialChar = searchTerm.replace(/[^a-zA-A0-9]/g, "");
        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
            ]
        });
        res.render('search', { data });
    } catch (err) {
        console.log(err);
    }
})

router.get('/about', (req, res) => {
    res.render('about',{
        currentRoute : '/about',
    });
})






module.exports = router;