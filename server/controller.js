








module.exports = {

    createMessage: (req, res) => {
        const db = req.app.get('db')
        const {auth_id} = req.session.user
        const {message} = req.body
        db.create_message([message, auth_id]).then(() => res.status(200))
    },

    getMessage: (req, res) => {
        const db = req.app.get('db')
        const {auth_id} = req.session.user
        // const {id} = req.params
        db.get_message([auth_id]).then((message) => {
            res.status(200).send(message)
        }).catch(err => console.log(err))
    }
}