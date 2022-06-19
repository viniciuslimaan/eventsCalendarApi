const userModel = require('../model/userModel')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
    async login(req, res) {
        const { email, password } = req.body

        const user = await userModel.findOne({'email': { '$eq': email }})

        if (!user)
            return res.status(404).json({ error: 'E-mail não encontrado!' })

        if (await bcryptjs.compare(password, user.password)) {
            const [ idUser, nameUser ] = [ user.id, user.name ]

            const token = jwt.sign(
                { idUser, nameUser },
                `${process.env.JWT_SECRET_TOKEN}`,
                { expiresIn: `${process.env.JWT_EXPIRES}` }
            )

            return res.status(200).json({ token })
        } else {
            return res.status(400).json({ error: 'Senha incorreta!' })
        }
    }

    async create(req, res) {
        // Gerar senha com hash
        let salt = bcryptjs.genSaltSync()
        req.body.password = bcryptjs.hashSync(req.body.password, salt)

        let user = new userModel(req.body)

        await user
            .save()
            .then(response => {
                response.password = undefined

                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async show(req, res) {
        await userModel
            .findById(req.params.id)
            .then(response => {
                if (response) {
                    response.password = undefined

                    return res.status(200).json(response);
                } else
                    return res.status(404).json({ error: 'Usuário não encontrado!' });
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async update(req, res) {
        if (req.body.password) {
            let salt = bcryptjs.genSaltSync()
            req.body.password = bcryptjs.hashSync(req.body.password, salt)
        }

        await userModel
            .findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
            .then(response => {
                response.password = undefined

                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async delete(req, res) {
        await userModel
            .deleteOne({ '_id': req.params.id })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }
}

module.exports = new UserController()