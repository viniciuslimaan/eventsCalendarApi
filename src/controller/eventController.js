const eventModel = require('../model/eventModel')

class EventController {
    async create(req, res) {
        const event = new eventModel(req.body)

        await event
            .save()
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async update(req, res) {
        await eventModel
            .findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async all(req, res) {
        await eventModel
            .find({ author: { '$eq': req.params.author } })
            .sort('start')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async show(req, res) {
        await eventModel
            .findById(req.params.id)
            .then(response => {
                if (response) {
                    return res.status(200).json(response)
                } else {
                    return res.status(404).json({ error: 'Evento não encontrado!' })
                }
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async delete(req, res) {
        await eventModel
            .deleteOne({ '_id': req.params.id })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }
}

module.exports = new EventController()