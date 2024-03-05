import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

function performOperation(value1, value2, operation) {


    switch (operation) {
        case "equals":
            return value1 === value2;

        case "does_not_equal":
            return value1 !== value2;
        case "greater_than":
            return value1 > value2;
        case "less_than":
            return value1 < value2;
        default:
            throw new Error('Invalid operation');
    }

}

const header = "Bearer sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912";
const formId = "cLZojxk94ous";
const baseURL = "https://api.fillout.com";

app.get("/", async (req, res) => {
    const queryParams = req.query;
    const filters = req.body;

    console.log(new URLSearchParams(queryParams));

    try {
        const response = await axios.get(`${baseURL}/v1/api/forms/${formId}/?${new URLSearchParams(queryParams)}`, {
            headers: {
                "Authorization": header
            }
        });

        let json = response.data;
        let questions = json.questions;

        if (Object.keys(filters).length !== 0) {
            questions = questions.filter(question => {
                const filter = filters.find(filter => filter.id === question.id);
                if (filter) {
                    let answer = performOperation(question.name, filter.value, filter.condition);
                    return answer
                }
                return false

            });
        }

        json.questions = questions;
        res.send(json);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Error with payload");
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
