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
        .select({ name: 1, tags: 1, isPublished: 1, author: 1 });
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

async function updateCourse(id) {
    // Update a document(query first)
    // const course = await Course.findById(id);
    // if (!course) return;
    // course.set({
    //     name: 'Linux System 1 update'
    // })
    // course.save();

    // Update a document(update first)
    // const result = await Course.update({ _id: id }, {
    //     $set: { name: 'Linux System 1' }
    // });

    // Update a document(update first) and return it
    const result = await Course.findByIdAndUpdate({ _id: id }, {
        $set: { name: 'Linux System 1 update' }
    }, { new: true });
}

async function removeCourse(id) {
    // const result = await Course.deleteOne({ _id: id});
    // const result = await Course.deleteMany({_id: id});
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

//updateCourse('5ead3f260552194ce48ce4ec');
//removeCourse('5ead3f260552194ce48ce4ec');
getCourses();
// createCourse();
