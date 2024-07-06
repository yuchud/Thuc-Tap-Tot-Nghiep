const baseController = {
  handleRequest: async function (operation, req, res) {
    try {
      const result = await operation(req);
      if (result.hasOwnProperty("error")) {
        res.status(400).send(result);
      } else {
        res.json(result);
      }
    } catch (e) {
      console.error(e.message);
      res.status(500).json({ error: e.message });
    }
  },
};

module.exports = baseController;
