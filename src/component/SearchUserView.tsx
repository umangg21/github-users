import React from 'react';
import { ButtonBase, Button, CardActionArea, Card } from '@material-ui/core';
import { styles } from './Style';

interface ISearchUserViewProps {
    userInfo: any;
    setViewProfile: Function;
}

interface ISearchUserViewStates {

    UserMainInfo: any;
}


export class SearchUserView extends React.Component<ISearchUserViewProps, ISearchUserViewStates> {

    constructor(props: any) {
        super(props)
        this.state = { UserMainInfo: {} }
    }

    viewProfile = () => {
        this.props.setViewProfile(this.state.UserMainInfo)
    }

    componentDidMount = () => {

        let requestUrl = this.props.userInfo.url
        fetch(requestUrl)
            .then((response) => {
                return response.json();
            })
            .then((myJson: any) => {
                this.setState({ UserMainInfo: myJson })
            });

    }



    render() {
        return (
            <React.Fragment>
                <Card style={styles.searchUserCard} onClick={this.viewProfile}>
                    <div className="layout-row">
                        <div>
                            <img src={this.state.UserMainInfo.avatar_url} style={styles.searchUserImage}></img>
                        </div>
                        <div className="layout-column layout-align-space-between-start" style={styles.UserDetail}>
                            <a onClick={this.viewProfile}><span style={styles.userName}>{this.state.UserMainInfo.name}</span></a>
                            <span style={styles.repoDesc}>{this.state.UserMainInfo.login}</span>

                        </div>
                    </div>
                </Card>

            </React.Fragment>
        )
    }
}

export default SearchUserView;