import React from 'react';
import { TextField, CircularProgress } from '@material-ui/core';
import { styles } from './Style';
import SearchUserView from './SearchUserView';
import UserProfile from './UserProfile';

interface IMainProps {
}

interface IMainStates {
    UserList: any,
    serachString: any,
    visiblePage: number, // 0 = Home, 1 = ViewProfile
    visibleUserProfile: any
    inProgress: boolean,
}

export class Main extends React.Component<IMainProps, IMainStates> {

    constructor(props: any) {
        super(props)

        this.state = { serachString: "", UserList: [], visiblePage: 0, visibleUserProfile: {}, inProgress: false }

    }

    handleChange = (event: any) => {
        let newSearchString = event.target.value
        this.setState({ serachString: newSearchString })
    }

    handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            this.findUsers()
        }
    }

    findUsers = () => {
        this.setState({ inProgress: true })

        let requestUrl = `https://api.github.com/search/users?q=${this.state.serachString}`

        fetch(requestUrl)
            .then((response) => {
                return response.json();
            })
            .then((myJson: any) => {
                this.setState({ UserList: myJson.items, inProgress: false })
            });

    }

    getUser = () => {
        return this.state.UserList.map((user: any) => (
            < SearchUserView
                userInfo={user}
                setViewProfile={this.setViewProfile}
            />
        ))
    }

    setViewProfile = (userInfo: any) => {
        this.setState({ visiblePage: 1, visibleUserProfile: userInfo })
    }

    render() {
        var viewPage;
        let spinner = (
            <div className="layout-column layout-align-center-center">
                <CircularProgress style={styles.inProgress} />
            </div>
        )

        if (this.state.visiblePage == 0) {
            let userList = this.getUser()
            viewPage = (
                <React.Fragment>
                    <div className="layout-row layout-align-start-center" style={styles.searchUser}>
                        <TextField
                            id="outlined-search"
                            label="Find a member..."
                            value={this.state.serachString}
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyPress}
                            margin="normal"
                            variant="outlined"
                        />
                        <span style={styles.userDesc}>Enter Name in text field and press Enter Key</span>

                    </div>

                    <div className="flex-90" >
                        {this.state.inProgress ? spinner : userList}
                    </div>
                </React.Fragment>
            )
        }
        else {
            viewPage = (
                <UserProfile
                    userInfo={this.state.visibleUserProfile}
                />
            )
        }


        return (
            <React.Fragment>
                <div className="flex layout-row">
                    <div className="flex-15 layout-row"></div>
                    <div className="flex-70 layout-column" >
                        <div style={styles.MainHeader}></div>
                        {viewPage}

                    </div>
                    <div className="flex-15 layout-row"></div>

                </div>

            </React.Fragment>
        )
    }
}

export default Main;