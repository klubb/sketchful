








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
    },

    delete: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.delete_message([id]).then((message) => {
            res.status(200).send(message)
        }).catch(err => {
            console.log(err)
        })
    },

    editUser: (req, res) => {
        const db = req.app.get('db')
        let {username} = req.body
        const {auth_id} = req.session.user
        db.update_username([username, auth_id]).then((user) => {
            req.session.user = user[0]
            res.status(200).send(req.session.user)
        })
    },

    deleteUser: (req, res) => {
        const db = req.app.get('db')
        const {auth_id} = req.session.user
        db.delete_account([auth_id]).then(() => {
            req.session.destroy()
            
            res.status(200).send('Worked')

        }).catch(err => {
            console.log(err)
        })
    },

    logout: (req, res) => {
        req.session.destroy();
        res.redirect(process.env.REACT_APP_HOME)
    },

    checkUser: (req,res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user);
          } else {
            res.status(200).send("Please Login");
          }
    },

    deleteMessages: (req, res) => {
        const db = req.app.get('db')
        const {auth_id} = req.session.user
        db.delete_message([auth_id]).then((message) => {
            res.status(200).send(message)
        })
    }
}