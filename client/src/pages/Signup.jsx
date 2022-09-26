import React from 'react';
import { Page, Navbar, Link, NavLeft, NavRight, NavTitle, List, ListInput, Button, Block, Col, Row, f7 } from 'framework7-react';

const DoRegister = (e) => {
    e.preventDefault();
    const formData = f7.form.convertToData(e.target)
    if (formData.confirmPassword == formData.password) {
        // /register 
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        }
        fetch("http://localhost:5000/register", opts).then((response) => { console.log(JSON.stringify(response.json())) })
    }
    else {
        f7.dialog.alert("Passwlord does not match the Confirm Password", "Authentication App")
        //f7.dialog.alert(JSON.stringify(formData), "Authentication App")
    }
}

export default () => (
    <Page name="signup">
        <Navbar>
            <NavLeft backLink="Back"></NavLeft>
            <NavTitle>User Authentication</NavTitle>
            <NavRight>
                <Link panelOpen="left">
                    <span class="material-icons">
                        menu
                    </span>
                </Link>
            </NavRight>
        </Navbar>
        <List noHairlinesMd form onSubmit={(e) => DoRegister(e)}>
            <ListInput
                outline
                label="Name"
                name="name"
                floatingLabel
                type="text"
                placeholder="Name"
                validate
                clearButton
            >
            </ListInput>
            <ListInput
                outline
                label="Username"
                name="username"
                floatingLabel
                type="text"
                placeholder="Username"
                validate
                clearButton
            >
            </ListInput>
            <ListInput
                outline
                label="Email"
                name="email"
                floatingLabel
                type="email"
                placeholder="Email"
                validate
                clearButton
            >
            </ListInput>
            <ListInput
                outline
                label="Mobile"
                name="mobileNumber"
                floatingLabel
                type="number"
                placeholder="Mobile"
                validate
                clearButton
            ></ListInput>
            <ListInput
                outline
                label="Image URL"
                name="userImage"
                floatingLabel
                type="text"
                placeholder="Image URL"
                validate
                clearButton
            ></ListInput>
            <ListInput
                outline
                label="Password"
                name="password"
                floatingLabel
                type="password"
                placeholder="Password"
                validate
                clearButton
            ></ListInput>
            <ListInput
                outline
                label="Confirm Password"
                name="confirmPassword"
                floatingLabel
                type="password"
                placeholder="Confirm Password"
                validate
                clearButton
            ></ListInput>
            <Block>
                <Row>
                    <Col>
                        <Button fill type="submit">Signup</Button>
                    </Col>
                </Row>
            </Block>
        </List>
    </Page >
)