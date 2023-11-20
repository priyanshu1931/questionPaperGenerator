const Question=require('../models/question');
module.exports.getQuestion= async(req,res)=>{
   const query= req.query ;
   var easy = query.easy*1.0;
   const medium=(query.medium/3);
   const hard = (query.hard/5);
   const total=easy+medium+hard;
   easy=easy+100-total;
   allRandomQuestions=[];
   Promise.all([
    Question.aggregate([
        { $match: { difficulty: 'easy' } },
        { $sample: { size: easy} }
    ]),
    Question.aggregate([
        { $match: { difficulty: 'medium' } },
        { $sample: { size: medium || 0 } }
    ]),
    Question.aggregate([
        { $match: { difficulty: 'hard' } },
        { $sample: { size: hard || 0 } }
    ])
]).then((data) => {
    allRandomQuestions.push(...data[0], ...data[1], ...data[2]);
    res.json({
        question: allRandomQuestions,
        success: true,
    });
}).catch((err) => {
    console.log(err);
});

    
}
module.exports.postQuestion = async (req, res) => {
    console.log(req.body)
    let questions = req.body.question;
    let result = [];

    // If questions is not an array, convert it to an array
    if (!Array.isArray(questions)) {
        questions = [questions];
    }

    // Use map to create an array of promises returned by Question.create
    const createQuestionPromises = questions.map(element => Question.create(element));

    try {
        // Wait for all create operations to complete
        result = await Promise.all(createQuestionPromises);

        res.json({
            result: result,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error",
            success: false,
        });
    }
};

