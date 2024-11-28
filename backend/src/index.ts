
const express = require('express');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://llewellyn:llewellyn@xtratime.cpt6byu.mongodb.net/?retryWrites=true&w=majority&appName=xtratime";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB
let db: any;

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    db = client.db("xtratime");
    console.log("You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

const app = express();
const port = 3001; // Use a different port from your React app

// [ 'teachers', 'students', 'classrooms', 'admins', 'schools' ]

const cors = require('cors');

// Enable CORS for all requests
app.use(cors());
app.use(express.json());

app.post('/student-login', cors(), async (req: any, res: any) => {
  const { username, password }= req.body;

  try {
    const collection = db.collection('students');
    const documents = await collection.find({username:username}).toArray();

    if(documents[0].password === password){
      res.status(200).send({ message: 'Login successful', user: documents[0], success:1 });
    } else {
      res.status(200).send({ message: 'Login failed', user: {}, success:0 });
    }
  } catch (error) {
    //console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/teacher-login', cors(), async (req: any, res: any) => {
  const { username, password }= req.body;

  try {
    const collection = db.collection('teachers');
    const documents = await collection.find({username:username}).toArray();
    if(documents[0].password === password){
      res.status(200).send({ message: 'Login successful', user: documents[0], success:1 });
    } else {
      res.status(200).send({ message: 'Login failed', user: {}, success:0 });
    }
  } catch (error) {
    //console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/classInfo', cors(), async (req: any, res: any) => {
  const { id }= req.body;

  try {
    const collection = db.collection('classes');
    const ID = new ObjectId(id);
    const documents = await collection.find({ _id: ID }).toArray();
    res.status(200).send({ message: 'class successful', classInfo: documents[0], success:1 });

  } catch (error) {
    //console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});




app.post('/topicPosts', cors(), async (req: any, res: any) => {
  const { id }= req.body;

  try {
    const collection = db.collection('posts');
    const ID = new ObjectId(id);
    const documents = await collection.find({ topic_id: ID }).toArray();
    res.status(200).send({ message: 'topic successful', topicPosts: documents, success:1 });

  } catch (error) {
    //console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

app.post('/postQas', cors(), async (req: any, res: any) => {
  const { post_id }= req.body;
  const objectId = new ObjectId(post_id);

  try {
    const collection = db.collection('qas');
    const documents = await collection.find({post_id: objectId}).toArray();

    res.status(200).send({ message: 'topic successful', postQas: documents, success:1 });

  } catch (error) {
    //console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

app.post('/announcements', cors(), async (req: any, res: any) => {
  const { offset }= req.body;

  try {
    const collection = db.collection('announcements');
    // Get the current date
    const today = new Date();
    // Set the time to the beginning of the day (midnight)
    today.setHours(0, 0, 0, 0);

    // Calculate the end of the day (11:59:59 PM)
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const documents = await collection.find({}).toArray();


    // Query documents with 'time' field within today's date range
    // const documents = await collection.find({
    //     time: {
    //         $gte: today,
    //         $lt: endOfDay
    //     }
    // }).toArray();
    res.status(200).send({ message: `announcements with offset: ${offset}`, announcements: documents, success:1 });




  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/submitQuestion', cors(), async (req: any, res: any) => {
  const { question, user, post_id, isFAQ, link }= req.body;
  console.log(post_id)
  const post_id_obj = new ObjectId(post_id);

  try {

    let document = {
      question,
      student_name: user,
      post_id: post_id_obj,
      ...(isFAQ && { isFAQ: true }),
      ...(link && { link: link })
    };


    const result = await db.collection('qas').insertOne(document);
    console.log('QAS inserted with ID:', result.insertedId);

  } catch (error) {
    //console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});


app.post('/getStudents', cors(), async (req: any, res: any) => {
  const {school_code} = req.body;

  try {
    const collection = db.collection('students');
    const documents = await collection.find({school_code:school_code}).toArray();
    res.status(200).send({ message: 'students data', students: documents, success:1 });

  } catch (error) {
    //console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});


app.post('/createClass', cors(), async (req: any, res: any) => {
  const {class_name, teacher, student_ids, teacher_id, grade, subject} = req.body;

  try {
    const document = {
      class_name: class_name,
      teacher: teacher,
      grade: grade,
      subject: subject,
      teacher_id: new ObjectId(teacher_id)
    }

    const result = await db.collection('classes').insertOne(document);
    console.log('Class inserted with ID:', result.insertedId);

    const class_doc_student = {
      name: class_name,
      teacher: teacher,
      subject: subject,
      grade: grade,
      id: result.insertedId,
    }

    const class_doc_teacher = {
      name: class_name,
      grade: grade,
      subject: subject,
      id: result.insertedId,
    }
    console.log(student_ids);

    const studentIDs = student_ids.map((id: string) => new ObjectId(id));
    const updateStudents = await db.collection('students').updateMany(
       {"_id": {$in : studentIDs}},{$push: { "classes": class_doc_student } }
    );
    
    const teacherID = new ObjectId(teacher_id);
    const updateTeachers = await db.collection('teachers').updateOne(
      {"_id": teacherID},{$push: { "classes": class_doc_teacher } }
   );

  }
  catch (error) {
    //console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/createTopic', cors(), async (req: any, res: any) => {

  const {class_id, name, description} = req.body;

  try {
    const ID = new ObjectId();
    const classID = new ObjectId(class_id);
    const document = {
      id: ID,
      name: name,
      description: description
    }

    const result = await db.collection('classes').updateOne(
      {"_id": classID},{$push: { "topics": document } });

    } catch (error) { 
     res.status(500).json({ error: 'Internal server error' });
    }
   

});

app.post('/createPost', cors(), async (req: any, res: any) => {

  const {topic_id, content, link, time} = req.body;

  try {
    const topicID = new ObjectId(topic_id);

    const document = link == '' ? {
      topic_id: topicID,
      content: content,
      time: time
    } : {
      topic_id: topicID,
      content:content,
      time: time,
      link: link
    }

    const result = await db.collection('posts').insertOne(document);
    res.status(200).send({ message: 'Post created', success:1 });

    } catch (error) { 
     res.status(500).json({ error: 'Internal server error' });
    }
   

});

app.post('/updatePost', cors(), async (req: any, res: any) => {
  const {post_id, content, link, time} = req.body;

  try {


    const result = await db.collection('posts').updateOne(
      { _id: new ObjectId(post_id) }, // Filter
      { $set: {       
        content:content,
        time: time,
        ...(link && { link: link })
      
      } }
    );
    res.status(200).send({ message: 'Post updated', success:1 });

  } catch (error) { 
    res.status(500).json({ error: 'Internal server error' });
  }

});



app.post('/deletePost', cors(), async (req: any, res: any) => {
  const {post_id} = req.body;

  try {
    const result = await db.collection('posts').deleteOne({ "_id": new ObjectId(post_id) });
    res.status(200).send({ message: 'Post deleted', success:1 });
  } catch (error) { 
    res.status(500).json({ error: 'Internal server error' });
  }

});

app.post('/replyQas', cors(), async (req: any, res: any) => {
  const {qas_id, answer, link} = req.body;

  try {
    const result = await db.collection('qas').updateOne(
      { _id: new ObjectId(qas_id) }, 
      { $set: {       
        answer:answer,
        ...(link && { link: link })
      } }
    );
    res.status(200).send({ message: 'Qas replied', success:1 });

  } catch (error) { 
    res.status(500).json({ error: 'Internal server error' });
  }


});


app.post('/deleteQas', cors(), async (req: any, res: any) => {
  const {qas_id} = req.body;

  try {
    const result = await db.collection('qas').deleteOne({ "_id": new ObjectId(qas_id) });
    res.status(200).send({ message: 'Qas deleted', success:1 });
  } catch (error) { 
    res.status(500).json({ error: 'Internal server error' });
  }

});

app.post('/updateAnswer', cors(), async (req: any, res: any) => {
  const {qas_id, answer, link, time} = req.body;

  try {
    const result = await db.collection('qas').updateOne(
      { _id: new ObjectId(qas_id) }, // Filter
      { $set: {       
        answer:answer,
        time: time,
        ...(link && { link: link })
      } }
    );
    res.status(200).send({ message: 'Qas answer updated', success:1 });

  } catch (error) { 
    res.status(500).json({ error: 'Internal server error' });
  }

});

app.post('/deleteClass', cors(), async (req: any, res: any) => {
  const {class_id, teacher_id} = req.body;

  console.log(class_id, '   ', teacher_id)

  try {
    const result = await db.collection('classes').deleteOne({ "_id": new ObjectId(class_id) });

    db.collection('teachers').updateMany(
      {'_id':new ObjectId(teacher_id)}, // Filter to match documents
      { $pull: { "classes": { "id": new ObjectId(class_id) } } }
   )

   db.collection('students').updateMany(
    {}, // Filter to match documents
    { $pull: { "classes": { "id": new ObjectId(class_id) } } }
 )

    res.status(200).send({ message: 'Class deleted', success:1 });
  } catch (error) { 
    res.status(500).json({ error: 'Internal server error' });
  }



});


app.post('/deleteTopic', cors(), async (req: any, res: any) => {
  const {class_id, topic_id} = req.body;

  try {
    
    db.collection('classes').updateMany(
      {'_id':new ObjectId(class_id)}, // Filter to match documents
      { $pull: { "topics": { "id": new ObjectId(topic_id) } } }
    )

    const post_ids = db.collection.find({ topic_id: new ObjectId(topic_id) }).map((doc: any) => doc._id);

    db.collection('posts').deleteMany({ topic_id: new ObjectId(topic_id) });
    db.collection('qas').deleteMany({ post_id: { $in: post_ids } });
    
    res.status(200).send({ message: 'Class deleted', success:1 });
  } catch (error) { 
    res.status(500).json({ error: 'Internal server error' });
  }



});

app.post('/searchClasses', cors(), async (req: any, res: any) => {
  const { teacher, subject, grade, school }= req.body;
  let teacher_id = '';

  if(teacher){
    teacher_id = new ObjectId(teacher);
  } 
  const filters:any = {teacher_id: teacher_id , subject:subject, grade:grade};
  const query:any = {};

  // Dynamically build the query object
  Object.keys(filters).forEach(k => {
      if (filters[k] !== undefined && filters[k] !== 'all') {
          query[k] = filters[k];
      }
  });

  console.log(query);

  try {
    const collection = db.collection('classes');

    const documents = await collection.find(query).toArray();
    res.status(200).send({ message: 'received classes', classes: documents, success:1 });

  } catch (error) {
    //console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

app.post('/getTeachers', cors(), async (req: any, res: any) => {
  const {school_code} = req.body;

  try {
    const collection = db.collection('teachers');
    const documents = await collection.find({}).toArray();
    res.status(200).send({ message: 'teachers data', teachers: documents, success:1 });

  } catch (error) {
    //console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

app.post('/getSubjects', cors(), async (req: any, res: any) => {
  const {school_code} = req.body;

  try {
    const collection = db.collection('subjects');
    const documents = await collection.find({school_code:school_code}).toArray();
    res.status(200).send({ message: 'subjects data', subjects: documents, success:1 });

  } catch (error) {
    //console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});





