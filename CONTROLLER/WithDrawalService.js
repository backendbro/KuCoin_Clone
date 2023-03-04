class WithDrawalService {
    async withDrawalRequest (req,res) {
        const userId = req.user.id
    }

    async confirmWithDrawalRequest(req,res) {
        const {userId} = req.body
    } 
}

module.exports = new WithDrawalService