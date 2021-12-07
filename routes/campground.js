const router = require('express').Router();
const Campground = require('../model/Campground')

router.get('/', async(req,res)=>{
    let campgrounds = await Campground.find({}).sort({_id: "desc"})
    res.render("campgrounds/index", {campgrounds})
})
router.route('/new')
.get((req,res)=>{
    res.render('campgrounds/new')
})
.post(async(req,res)=>{
 let campground =  await new Campground(req.body).save()
    res.redirect(`/campgrounds/${campground.slug}`)
})
router.get('/:slug', async(req,res)=>{
    let campground = await Campground.findOne({slug: req.params.slug})
    res.render("campgrounds/show", {campground})
})

router.delete('/:slug/delete', async(req,res)=>{
    await Campground.findOneAndDelete({slug: req.params.slug})
    res.redirect('/campgrounds')
})
router.route('/:slug/edit')
.get(async(req,res)=>{
    let campground = await Campground.findOne({slug: req.params.slug})
    res.render("campgrounds/edit", {campground})
})
.put(async(req,res)=>{
    await Campground.findOneAndUpdate({slug: req.params.slug}, req.body)
    res.redirect(`/campgrounds/${req.params.slug}`)
})
module.exports = router