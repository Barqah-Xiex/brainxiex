const brainxiex = require("../")({session_local: true});


brainxiex.api.ai({
    model: 'brainxiex',
    messages: [{ role: 'user', content: 'Apakah Rapunzel suka makan kerupuk ?' }],
    sessionID: 'Hawimau'
})
.then(res => {
    console.log(res);
})
.catch(err => {
    console.error(err);
});