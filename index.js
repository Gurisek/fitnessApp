class IndexController {
    async getExample(req, res) {
        res.status(200).json({ message: "This is an example response" });
    }

    async postExample(req, res) {
        const data = req.body;
        // Process the data as needed
        res.status(201).json({ message: "Data received", data });
    }

    // Add more methods as needed for handling other API requests
}

export default new IndexController();