import React from "react";
import { render } from "react-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { ShallowComponent } from "robe-react-commons";
import Progress from "progress/Progress";
import Components from "./components/Components";
import Docs from "./docs/Docs";
import Welcome from "./Welcome";
import JSDocs from "./JSDocs";
import "./style.css";
import { NotFound } from "./error";


const app = document.getElementById("app");


class Site extends ShallowComponent {
    constructor(props: Object) {
        super(props);
        let path = window.location.hash.substring(1).split("/")[0];
        this.state = {
            activeKey: path
        };
    }

    render(): Object {
        let activePage = this.__getActivePage(this.state.activeKey);
        return (
            <div>
                <Navbar inverse>
                    <a href="https://github.com/robeio/robe-react-ui">
                        <img
                            style={{ position: "absolute", top: "0px", right: "0px", border: "0px", zIndex: 1 }}
                            alt="Fork me on GitHub"
                            src="./forkme_right_orange_ff7600.png"
                        />
                    </a>
                    <Navbar.Header>
                        <img src="./avatar.png" alt="logo" />
                        <Navbar.Brand>
                            <a onClick={this.__onSelect} >Robe React UI</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav activeKey={this.state.activeKey} onSelect={this.__onSelect}>
                        <NavItem eventKey="Components" >Components</NavItem>
                        <NavItem eventKey="Docs" >Docs</NavItem>
                        <NavItem eventKey="JSDocs" >JSDocs</NavItem>
                        <NavItem eventKey="About" >About</NavItem>
                    </Nav>
                </Navbar>
                {activePage}
            </div>
        );
    }

    __onSelect = (key: string) => {
        Progress.start();
        window.location.hash = `#${key}`;
        this.setState({
            activeKey: key
        });
    };
    __getActivePage = (path: string) => {
        switch (path) {
            case "Components":
                return (
                    <Components />
                );
            case "Docs":
                return (
                    <Docs />
                );
            case "JSDocs":
                return (
                    <JSDocs />
                );
            case "About":
                return (
                    <NotFound />
                );
            default:
                return (
                    <Welcome />
                );
        }
    }
    componentDidUpdate() {
        Progress.done();
    }
}

render(
    <Site />,
    app
);
