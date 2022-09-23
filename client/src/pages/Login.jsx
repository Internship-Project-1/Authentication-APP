import React from 'react';
import { App, Panel, View, Page, Block, Navbar, Row, Col, Button, Link, NavLeft, NavRight, NavTitle, f7, List, ListInput } from 'framework7-react';


const DoRegister = (e) => {
    e.preventDefault();
    const formData = f7.form.convertToData(e.target)
    f7.dialog.alert(JSON.stringify(formData), "Authentication App")
    //send data to server
    //message authenticated
}


export default () => (
    <Page name="login">
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
        <div className="LoginIcon">
            <span class="material-icons">
                person
            </span>
        </div>
        <List noHairlinesMd form onSubmit={(e) => DoRegister(e)}>
            <ListInput
                outline
                label="Username"
                name="Username"
                floatingLabel
                type="text"
                placeholder="Username"
                validate
                clearButton
            >
            </ListInput>
            <ListInput
                outline
                label="Login"
                name="Login"
                floatingLabel
                type="password"
                placeholder="Login"
                validate
                clearButton
            >
            </ListInput>
            <Block>
                <Row>
                    <Col>
                        <Button fill type="submit">Login</Button>
                    </Col>
                </Row>
            </Block>
        </List>
    </Page>
)