const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/data/tours.json`)
);

const getAllTours = (req, res) => {
    res.status(200).json({
        status : "success",
        result : tours.length,
        data : {
            tours
        }
    })
}

const getATour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find( el => el.id === id);

    if(!tour) {
        return res.status(404).json({
            status: "failed",
            message: "invalid id"
        })
    }

    res.status(200).json({
        status : "success",
        data : {
            tour
        }
    });
}

const postATour =  (req, res) => {

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign( {id : newId}, req.body);

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/data/tours.json`, 
        JSON.stringify(tours), 
        err => {
        res.status(201).json({
             status: "success",
             data : {
                 tour : newTour
             }
        });
    }
    );
}


const editATour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find( el => el.id === id);

    if(!tour) {
        return res.status(404).json({
            status: "failed",
            message: "invalid id"
        })
    }

    res.status(204).json({
        status : "success",
        data : {
            tour : "<updated here>"
        }
    })
}

const deleteATour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find( el => el.id === id);

    if(!tour) {
        return res.status(404).json({
            status: "failed",
            message: "invalid id"
        })
    }

    res.status(204).json({
        status : "success",
        data : {
            tour : null
        }
    })

}


app.route("/api/v1/tours").get(getAllTours).post(postATour);
app.route("/api/v1/tours/:id").get(getATour).patch(editATour).delete(deleteATour);

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
