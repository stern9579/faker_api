const express = require("express");
const app = express();
const port = 8000
const { faker } = require('@faker-js/faker');
const { application } = require("express");

class User {
    constructor() {
        this.firstName = faker.name.firstName();
        this.lastName = faker.name.lastName();
        this.phoneNumber = faker.phone.phoneNumber();
        this.email = faker.internet.email();
        this.password = faker.internet.password();
    }
}
class Company {
    constructor() {
        this.id = faker.datatype.number();
        this.name = faker.company.companyName();
        this.address = {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zipCode: faker.address.zipCode(),
            country: faker.address.country()
        }
    }
}

// ------------------------
//     MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// ------------------------

console.log("hello")

const users = [
    { firstName: "Jake", lastName: "Smith" },
    { firstName: "Beth", lastName: "Smith" },
    { firstName: "Jordan", lastName: "Bell" },
    { firstName: "Haley", lastName: "Bourdaine" },
    { firstName: "Stacey", lastName: "Connelly" }
]

const Companies = []

// SERVER ROUING /api
app.get("/api", (req, res) => {
    res.json({ status: 'id' })
});

app.get("/api/users", (req, res) => {
    res.json(users)
})
app.get("/api/companies", (req, res) => {
    res.json(Companies)
})
// Get one user
app.get("/api/users/:idx", (req, res) => {
    const { idx } = req.params
    res.json({
        idx: req.params.idx,
        status: 200,
        user: users[idx]
    })
})

//-----POST REQ -----
app.post("/api/user", (req, res) => {
    const newUser = new User();
    console.log(newUser);
    users.push(newUser)
    res.json(newUser);
})
app.post("/api/company/new", (req, res) => {
    const newCompany = new Company();
    // console.log(newCompany);
    Companies.push(newCompany)
    // console.log(Companies);
    res.json(newCompany);
})

app.post("/api/user/company", (req, res) => {
    const newUser = new User();
    const newCompany = new Company();
    users.push(newUser);
    Companies.push(newCompany);
    res.json([newUser, newCompany]);
})
// app.post("/api/users", (req, res) => {
//     // req.body will contain the form data from Postman or from React
//     console.log(req.body);
//     // we can push it into the users array for now...
//     // later on this will be insterted into a database
//     users.push(req.body);
//     res.json({ status: "ok" })
// })



// Always at the end of the file
const server = app.listen(port, () =>
    console.log(`Server is locked and loaded on port ${server.address().port}!`)
);