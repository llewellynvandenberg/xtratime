var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var express = require('express');
var _a = require('mongodb'), MongoClient = _a.MongoClient, ServerApiVersion = _a.ServerApiVersion, ObjectId = _a.ObjectId;
var uri = "mongodb+srv://llewellyn:llewellyn@xtratime.cpt6byu.mongodb.net/?retryWrites=true&w=majority&appName=xtratime";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
var client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
// Connect to MongoDB
var db;
function run() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, , 2, 3]);
                    // Connect the client to the server	(optional starting in v4.7)
                    return [4 /*yield*/, client.connect()];
                case 1:
                    // Connect the client to the server	(optional starting in v4.7)
                    _a.sent();
                    // Send a ping to confirm a successful connection
                    db = client.db("xtratime");
                    console.log("You successfully connected to MongoDB!");
                    return [3 /*break*/, 3];
                case 2: return [7 /*endfinally*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
run().catch(console.dir);
var app = express();
var port = 3001; // Use a different port from your React app
// [ 'teachers', 'students', 'classrooms', 'admins', 'schools' ]
var cors = require('cors');
// Enable CORS for all requests
app.use(cors());
app.use(express.json());
app.post('/student-login', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, username, password, collection, documents, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                collection = db.collection('students');
                return [4 /*yield*/, collection.find({ username: username }).toArray()];
            case 2:
                documents = _b.sent();
                if (documents[0].password === password) {
                    res.status(200).send({ message: 'Login successful', user: documents[0], success: 1 });
                }
                else {
                    res.status(200).send({ message: 'Login failed', user: {}, success: 0 });
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                //console.error('Error fetching documents:', error);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/teacher-login', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, username, password, collection, documents, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                collection = db.collection('teachers');
                return [4 /*yield*/, collection.find({ username: username }).toArray()];
            case 2:
                documents = _b.sent();
                if (documents[0].password === password) {
                    res.status(200).send({ message: 'Login successful', user: documents[0], success: 1 });
                }
                else {
                    res.status(200).send({ message: 'Login failed', user: {}, success: 0 });
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                //console.error('Error fetching documents:', error);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/classInfo', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, collection, ID, documents, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                collection = db.collection('classes');
                ID = new ObjectId(id);
                return [4 /*yield*/, collection.find({ _id: ID }).toArray()];
            case 2:
                documents = _a.sent();
                res.status(200).send({ message: 'class successful', classInfo: documents[0], success: 1 });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                //console.error('Error fetching documents:', error);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/topicPosts', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, collection, ID, documents, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                collection = db.collection('posts');
                ID = new ObjectId(id);
                return [4 /*yield*/, collection.find({ topic_id: ID }).toArray()];
            case 2:
                documents = _a.sent();
                res.status(200).send({ message: 'topic successful', topicPosts: documents, success: 1 });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                //console.error('Error fetching documents:', error);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/postQas', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var post_id, objectId, collection, documents, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                post_id = req.body.post_id;
                objectId = new ObjectId(post_id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                collection = db.collection('qas');
                return [4 /*yield*/, collection.find({ post_id: objectId }).toArray()];
            case 2:
                documents = _a.sent();
                res.status(200).send({ message: 'topic successful', postQas: documents, success: 1 });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                //console.error('Error fetching documents:', error);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/announcements', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var offset, collection, today, endOfDay, documents, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                offset = req.body.offset;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                collection = db.collection('announcements');
                today = new Date();
                // Set the time to the beginning of the day (midnight)
                today.setHours(0, 0, 0, 0);
                endOfDay = new Date(today);
                endOfDay.setHours(23, 59, 59, 999);
                return [4 /*yield*/, collection.find({}).toArray()];
            case 2:
                documents = _a.sent();
                // Query documents with 'time' field within today's date range
                // const documents = await collection.find({
                //     time: {
                //         $gte: today,
                //         $lt: endOfDay
                //     }
                // }).toArray();
                res.status(200).send({ message: "announcements with offset: ".concat(offset), announcements: documents, success: 1 });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.error('Error fetching documents:', error_6);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/submitQuestion', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, question, user, post_id, isFAQ, link, post_id_obj, document_1, result, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, question = _a.question, user = _a.user, post_id = _a.post_id, isFAQ = _a.isFAQ, link = _a.link;
                console.log(post_id);
                post_id_obj = new ObjectId(post_id);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                document_1 = __assign(__assign({ question: question, student_name: user, post_id: post_id_obj }, (isFAQ && { isFAQ: true })), (link && { link: link }));
                return [4 /*yield*/, db.collection('qas').insertOne(document_1)];
            case 2:
                result = _b.sent();
                console.log('QAS inserted with ID:', result.insertedId);
                return [3 /*break*/, 4];
            case 3:
                error_7 = _b.sent();
                //console.error('Error fetching documents:', error);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/getStudents', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var school_code, collection, documents, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                school_code = req.body.school_code;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                collection = db.collection('students');
                return [4 /*yield*/, collection.find({ school_code: school_code }).toArray()];
            case 2:
                documents = _a.sent();
                res.status(200).send({ message: 'students data', students: documents, success: 1 });
                return [3 /*break*/, 4];
            case 3:
                error_8 = _a.sent();
                //console.error('Error fetching documents:', error);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/createClass', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, class_name, teacher, student_ids, teacher_id, grade, subject, document_2, result, class_doc_student, class_doc_teacher, studentIDs, updateStudents, teacherID, updateTeachers, error_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, class_name = _a.class_name, teacher = _a.teacher, student_ids = _a.student_ids, teacher_id = _a.teacher_id, grade = _a.grade, subject = _a.subject;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                document_2 = {
                    class_name: class_name,
                    teacher: teacher,
                    grade: grade,
                    subject: subject,
                    teacher_id: new ObjectId(teacher_id)
                };
                return [4 /*yield*/, db.collection('classes').insertOne(document_2)];
            case 2:
                result = _b.sent();
                console.log('Class inserted with ID:', result.insertedId);
                class_doc_student = {
                    name: class_name,
                    teacher: teacher,
                    subject: subject,
                    grade: grade,
                    id: result.insertedId,
                };
                class_doc_teacher = {
                    name: class_name,
                    grade: grade,
                    subject: subject,
                    id: result.insertedId,
                };
                console.log(student_ids);
                studentIDs = student_ids.map(function (id) { return new ObjectId(id); });
                return [4 /*yield*/, db.collection('students').updateMany({ "_id": { $in: studentIDs } }, { $push: { "classes": class_doc_student } })];
            case 3:
                updateStudents = _b.sent();
                teacherID = new ObjectId(teacher_id);
                return [4 /*yield*/, db.collection('teachers').updateOne({ "_id": teacherID }, { $push: { "classes": class_doc_teacher } })];
            case 4:
                updateTeachers = _b.sent();
                return [3 /*break*/, 6];
            case 5:
                error_9 = _b.sent();
                //console.error('Error fetching documents:', error);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.post('/createTopic', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, class_id, name, description, ID, classID, document_3, result, error_10;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, class_id = _a.class_id, name = _a.name, description = _a.description;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                ID = new ObjectId();
                classID = new ObjectId(class_id);
                document_3 = {
                    id: ID,
                    name: name,
                    description: description
                };
                return [4 /*yield*/, db.collection('classes').updateOne({ "_id": classID }, { $push: { "topics": document_3 } })];
            case 2:
                result = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                error_10 = _b.sent();
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/createPost', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, topic_id, content, link, time, topicID, document_4, result, error_11;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, topic_id = _a.topic_id, content = _a.content, link = _a.link, time = _a.time;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                topicID = new ObjectId(topic_id);
                document_4 = link == '' ? {
                    topic_id: topicID,
                    content: content,
                    time: time
                } : {
                    topic_id: topicID,
                    content: content,
                    time: time,
                    link: link
                };
                return [4 /*yield*/, db.collection('posts').insertOne(document_4)];
            case 2:
                result = _b.sent();
                res.status(200).send({ message: 'Post created', success: 1 });
                return [3 /*break*/, 4];
            case 3:
                error_11 = _b.sent();
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/updatePost', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, post_id, content, link, time, result, error_12;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, post_id = _a.post_id, content = _a.content, link = _a.link, time = _a.time;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.collection('posts').updateOne({ _id: new ObjectId(post_id) }, // Filter
                    { $set: __assign({ content: content, time: time }, (link && { link: link })) })];
            case 2:
                result = _b.sent();
                res.status(200).send({ message: 'Post updated', success: 1 });
                return [3 /*break*/, 4];
            case 3:
                error_12 = _b.sent();
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/deletePost', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var post_id, result, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                post_id = req.body.post_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.collection('posts').deleteOne({ "_id": new ObjectId(post_id) })];
            case 2:
                result = _a.sent();
                res.status(200).send({ message: 'Post deleted', success: 1 });
                return [3 /*break*/, 4];
            case 3:
                error_13 = _a.sent();
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/replyQas', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, qas_id, answer, link, result, error_14;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, qas_id = _a.qas_id, answer = _a.answer, link = _a.link;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.collection('qas').updateOne({ _id: new ObjectId(qas_id) }, { $set: __assign({ answer: answer }, (link && { link: link })) })];
            case 2:
                result = _b.sent();
                res.status(200).send({ message: 'Qas replied', success: 1 });
                return [3 /*break*/, 4];
            case 3:
                error_14 = _b.sent();
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/deleteQas', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var qas_id, result, error_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                qas_id = req.body.qas_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.collection('qas').deleteOne({ "_id": new ObjectId(qas_id) })];
            case 2:
                result = _a.sent();
                res.status(200).send({ message: 'Qas deleted', success: 1 });
                return [3 /*break*/, 4];
            case 3:
                error_15 = _a.sent();
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/updateAnswer', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, qas_id, answer, link, time, result, error_16;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, qas_id = _a.qas_id, answer = _a.answer, link = _a.link, time = _a.time;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.collection('qas').updateOne({ _id: new ObjectId(qas_id) }, // Filter
                    { $set: __assign({ answer: answer, time: time }, (link && { link: link })) })];
            case 2:
                result = _b.sent();
                res.status(200).send({ message: 'Qas answer updated', success: 1 });
                return [3 /*break*/, 4];
            case 3:
                error_16 = _b.sent();
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/deleteClass', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, class_id, teacher_id, result, error_17;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, class_id = _a.class_id, teacher_id = _a.teacher_id;
                console.log(class_id, '   ', teacher_id);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.collection('classes').deleteOne({ "_id": new ObjectId(class_id) })];
            case 2:
                result = _b.sent();
                db.collection('teachers').updateMany({ '_id': new ObjectId(teacher_id) }, // Filter to match documents
                { $pull: { "classes": { "id": new ObjectId(class_id) } } });
                db.collection('students').updateMany({}, // Filter to match documents
                { $pull: { "classes": { "id": new ObjectId(class_id) } } });
                res.status(200).send({ message: 'Class deleted', success: 1 });
                return [3 /*break*/, 4];
            case 3:
                error_17 = _b.sent();
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/deleteTopic', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, class_id, topic_id, post_ids;
    return __generator(this, function (_b) {
        _a = req.body, class_id = _a.class_id, topic_id = _a.topic_id;
        try {
            db.collection('classes').updateMany({ '_id': new ObjectId(class_id) }, // Filter to match documents
            { $pull: { "topics": { "id": new ObjectId(topic_id) } } });
            post_ids = db.collection.find({ topic_id: new ObjectId(topic_id) }).map(function (doc) { return doc._id; });
            db.collection('posts').deleteMany({ topic_id: new ObjectId(topic_id) });
            db.collection('qas').deleteMany({ post_id: { $in: post_ids } });
            res.status(200).send({ message: 'Class deleted', success: 1 });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
        return [2 /*return*/];
    });
}); });
app.post('/searchClasses', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, teacher, subject, grade, school, teacher_id, filters, query, collection, documents, error_18;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, teacher = _a.teacher, subject = _a.subject, grade = _a.grade, school = _a.school;
                teacher_id = '';
                if (teacher) {
                    teacher_id = new ObjectId(teacher);
                }
                filters = { teacher_id: teacher_id, subject: subject, grade: grade };
                query = {};
                // Dynamically build the query object
                Object.keys(filters).forEach(function (k) {
                    if (filters[k] !== undefined && filters[k] !== 'all') {
                        query[k] = filters[k];
                    }
                });
                console.log(query);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                collection = db.collection('classes');
                return [4 /*yield*/, collection.find(query).toArray()];
            case 2:
                documents = _b.sent();
                res.status(200).send({ message: 'received classes', classes: documents, success: 1 });
                return [3 /*break*/, 4];
            case 3:
                error_18 = _b.sent();
                //console.error('Error fetching documents:', error);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/getTeachers', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var school_code, collection, documents, error_19;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                school_code = req.body.school_code;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                collection = db.collection('teachers');
                return [4 /*yield*/, collection.find({}).toArray()];
            case 2:
                documents = _a.sent();
                res.status(200).send({ message: 'teachers data', teachers: documents, success: 1 });
                return [3 /*break*/, 4];
            case 3:
                error_19 = _a.sent();
                //console.error('Error fetching documents:', error);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/getSubjects', cors(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var school_code, collection, documents, error_20;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                school_code = req.body.school_code;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                collection = db.collection('subjects');
                return [4 /*yield*/, collection.find({ school_code: school_code }).toArray()];
            case 2:
                documents = _a.sent();
                res.status(200).send({ message: 'subjects data', subjects: documents, success: 1 });
                return [3 /*break*/, 4];
            case 3:
                error_20 = _a.sent();
                //console.error('Error fetching documents:', error);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Example app listening at http://localhost:".concat(port));
});
