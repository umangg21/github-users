import React from 'react';
import { CardActionArea, Card } from '@material-ui/core';
import { styles } from './Style';

interface IRepositoryViewProps {
    repoinfo: any;
}

interface IRepositoryViewStates {
}


export class RepositoryView extends React.Component<IRepositoryViewProps, IRepositoryViewStates> {

    constructor(props: any) {
        super(props)

    }

    render() {
        return (
            <React.Fragment>
                <Card style={styles.searchUserCard}>
                    <div className="layout-column layout-align-space-between-start">
                        <a><span style={styles.repoName}>{this.props.repoinfo.name}</span></a>
                        <span style={styles.repoDesc}>{this.props.repoinfo.description}</span>

                    </div>
                </Card>
            </React.Fragment>
        )
    }
}

export default RepositoryView;