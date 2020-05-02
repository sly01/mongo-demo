const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...'));


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Linux System 2',
        author: 'Ahmet',
        tags: ['linux', 'OS'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;

    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    // const courses = await Course.find();
    const courses = await Course
        .find({ author: 'Ahmet', isPublished: true })
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    // const courses = await Course
    //     // .find({ price: { $gte: 10, $lte: 20 } })
    //     //.find({ price: { $in: [10, 15, 20] } })
    //     .find()
    //     .or([{ author: 'Ahmet' }, { isPublished: true }])
    //     .limit(10)
    //     .sort({ name: 1 })
    //     .select({ name: 1, tags: 1 });
    console.log(courses);
}

getCourses();
// createCourse();
