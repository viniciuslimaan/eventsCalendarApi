const eventModel = require('../model/eventModel')
const userModel = require('../model/userModel')
const { isPast } = require('date-fns')

class EventValidation {
    async verifyData (req, res, next) {
        const { author, title, description, start, end } = req.body

        if (!author) {
            return res.status(400).json({ error: 'O usuário não foi encontrado! Por favor, saia e entre novamente na conta.' })
        } else if (!title) {
            return res.status(400).json({ error: 'O título do evento é obrigatório!' })
        } else if (!description) {
            return res.status(400).json({ error: 'A descrição do evento é obrigatório!' })
        } else if (!start) {
            return res.status(400).json({ error: 'A data e hora do início do evento são obrigatórios!' })
        } else if (!end) {
            return res.status(400).json({ error: 'A data e hora do final do evento são obrigatórios!' })
        } else {
            let exists

            if (req.params.id) {
                exists = await eventModel.findOne({
                    '_id': { '$ne': req.params.id },
                    'author': { '$eq': author },
                    'start': { '$eq': new Date(start) },
                    'end': { '$eq': new Date(end) }
                })
            } else {
                if (isPast(new Date(start)) && isPast(new Date(end)) && start > end)
                    return res.status(400).json({ error: 'Escolha uma data e hora futura.' })

                exists = await eventModel.findOne({
                    'author': { '$eq': author },
                    'start': { '$eq': new Date(start) },
                    'end': { '$eq': new Date(end) }
                })
            }

            if (exists) {
                return res.status(400).json({ error: 'Já existe um evento nesse dia e horário.' });
            }

            next()
        }
    }

    async verifyId(req, res, next) {
        const id = req.params.id

        let exists = await eventModel.findOne({
            '_id': { '$eq': id }
        })

        if (!exists)
            return res.status(400).json({ error: 'Evento não encontrado!' })

        next()
    }

    async verifyAuthor(req, res, next) {
        const author = req.params.author

        let userExists = await userModel.findOne({
            '_id': { '$eq': author }
        })

        if (!userExists)
            return res.status(400).json({ error: 'Usuário não encontrado!' })

        next()
    }
}

module.exports = new EventValidation