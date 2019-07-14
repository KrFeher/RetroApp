const mongoose = require('mongoose');
const config = require('config');

const dbUsername = config.get('db_username');
const dbPassword = config.get('db_password');

const uri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0-rxwrb.mongodb.net/RetroDb?retryWrites=true&w=majority`;

const opinionSchema = new mongoose.Schema({
  text: String,
  improvement: String,
  createdDate: {
    type: Date,
    default: Date.now
  },
  isImprovement: Boolean,
})

const exampleData = [{
    text: 'This was working out really well',
    improvement: null,
    isImprovement: false,
  },
  {
    text: 'This isnt that great',
    improvement: 'Should be better',
    isImprovement: true,
  },
  {
    text: 'Im sleepy',
    improvement: 'should have slept more',
    isImprovement: true,
  }
];

const Opinion = mongoose.model('Opinion', opinionSchema);

init = () => {
  try {
    mongoose.connect(uri, {
      useNewUrlParser: true
    });
    console.log('Connected to MongoDB...');
  } catch (error) {
    console.log('Could not connect to database. ERROR: ', error);
    return;
  }

  Opinion.deleteMany({}, (err) => {
      console.log('Starting to delete old entries...');
      if (err) {
        console.log('Deleting old entries failed...', err);
      } else {
        console.error('Successfully deleted old entries...');
      };
    })
    // .then(() => {
    //   return insertExamples();
    // })
    .catch((error) => {
      console.log(error);
    })
}

deleteOldEntries = () => {
  console.log('Deleting old database entries:');
  return Opinion.deleteMany({}, (err) => {
    if (err) {
      console.log('Deleting old entries failed...', err);
    } else {
      console.error('Successfully deleted old entries...');
    };
  })
}

insertExamples = () => {
  console.log('Starting to insert examples...');
  return Opinion.insertMany(exampleData, (err) => {
    if (err) {
      console.log('Inserting entries failed...', err);
    } else {
      console.error('Successfully inserted examples...');
    };
  });
}


getOpinions = async () => {
  console.log('calling getOpinions');
  const opinions = await Opinion.find();
  return opinions;
}

insertOpinion = async (opinion) => {
  const opinionToInsert = new Opinion({
    text: opinion.text,
    improvement: opinion.improvement,
    isImprovement: true,
  })
  const op = await opinionToInsert.save();
  return op;
}

insertManyOpinions = (opinions) => {
  return Opinion.insertMany(opinions); 
}

deleteOpinion = async (id) => {
  const result = await Opinion.deleteOne({
    _id: id
  })
  return result;
}

findOpinion = async (id) => {
  const result = await Opinion.findById(id);
  return result;
}

init();

module.exports = {
  getOpinions,
  insertOpinion,
  insertManyOpinions,
  deleteOpinion,
  findOpinion
};