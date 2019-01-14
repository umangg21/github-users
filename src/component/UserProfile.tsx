import React from 'react';
import RepositoryView from './RepositoryView';
import { styles } from './Style';
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, Card, CircularProgress } from '@material-ui/core';

interface IUserProfileProps {
    userInfo: any;
}

interface IUserProfileStates {
    repositoryList: any;
    sortedParameter: string;
    inProgress: boolean;
}


export class UserProfile extends React.Component<IUserProfileProps, IUserProfileStates> {

    constructor(props: any) {
        super(props)
        //let repositories = this.getRepositories()
        this.state = { repositoryList: null, sortedParameter: "full_name", inProgress: true }
        this.getRepositories()
    }

    getRepositoryList = () => {
        if (this.state.repositoryList) {
            console.log(this.state.repositoryList)
            return this.state.repositoryList.map((repository: any) => (
                <RepositoryView
                    repoinfo={repository}
                />
            ))
        }
    }


    getRepositories = () => {
        this.setState({ inProgress: true })

        let requestUrl = `${this.props.userInfo.repos_url}?sort=${this.state.sortedParameter}`
        fetch(requestUrl)
            .then((response) => {
                return response.json();
            })
            .then((myJson: any) => {
                this.setState({ repositoryList: myJson, inProgress: false })
            });
    }

    handleChange = (event: any) => {
        let sortedParameterString = event.target.value
        this.setState({ sortedParameter: sortedParameterString })
        this.getRepositories()
    }

    render() {

        let spinner = (
            <div className="layout-column layout-align-center-center">
                <CircularProgress style={styles.inProgress} />
            </div>
        )

        return (
            <React.Fragment>
                <div className="layout-row">
                    <div className="flex-25 layout-column">
                        <Card>
                            <img src={this.props.userInfo.avatar_url} style={styles.profileImage}></img>
                        </Card>
                        <span style={styles.repoHead}>{this.props.userInfo.name}</span>
                        <span style={styles.userDesc}>{this.props.userInfo.login}</span>
                    </div>
                    <div className="flex-75 layout-column">
                        <div className="layout-row layout-align-space-between-center">
                            <span style={styles.repoHead}>{`Repositories`}</span>
                            <FormControl variant="outlined" >
                                <InputLabel
                                    htmlFor="outlined-sort-simple"
                                >
                                    Sort
                                </InputLabel>
                                <Select
                                    value={this.state.sortedParameter}
                                    onChange={this.handleChange}
                                    input={
                                        <OutlinedInput
                                            labelWidth={30}
                                            name="sort"
                                            id="outlined-sort-simple"
                                        />
                                    }
                                >
                                    <MenuItem value={"full_name"}>Name</MenuItem>
                                    <MenuItem value={"created"}>Created Date</MenuItem>
                                    <MenuItem value={"updated"}>Updated Date</MenuItem>
                                    <MenuItem value={"pushed"}>Pushed Date</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        {this.state.inProgress ? spinner : this.getRepositoryList()}
                    </div>

                </div>

            </React.Fragment>
        )
    }
}

export default UserProfile;