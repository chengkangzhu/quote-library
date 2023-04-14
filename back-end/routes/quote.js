const router = require("express").Router();
const {
    getQuotes,
    getQuote,
    addQuote,
    editQuote,
    deleteQuote
} = require("../controllers/quoteController")

router.get("/", getQuotes);

router.get("/:id", getQuote);

router.post("/add", addQuote);

router.put("/edit/:id", editQuote);

router.delete("/delete/:id", deleteQuote);

module.exports = router;
