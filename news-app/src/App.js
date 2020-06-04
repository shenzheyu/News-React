import React, {Component} from 'react';
import MyNavbar from './component/MyNavbar';
import NewsList from './component/NewsList';
import Article from './component/Article';
import Result from './component/Result';
import Favorites from './component/Favorites';

import { Switch, Route } from 'react-router-dom';

class App extends Component {
    constructor() {
        super();
        this.state = {
            source: 'NYTimes',
            checked: false
        }
        this.handleSourceChange = this.handleSourceChange.bind(this);
    }

    handleSourceChange() {
        const checked = !this.state.checked;
        let source = '';
        if(checked) {
            source = 'Guardian';
        } else {
            source = 'NYTimes';
        }
        this.setState(prevState => {
            return {
                source: source,
                checked: checked
            };
        });
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route 
                        exact path='/#/article' 
                        render={() => <MyNavbar display='other' checked={this.state.checked} handleSourceChange={this.handleSourceChange}/>}
                    />
                    <Route 
                        exact path='/#/search' 
                        render={() => <MyNavbar display='other' checked={this.state.checked} handleSourceChange={this.handleSourceChange}/>}
                    />
                    <Route 
                        exact path='/#/favorites' 
                        render={() => <MyNavbar display='favorites' checked={this.state.checked} handleSourceChange={this.handleSourceChange}/>}
                    />
                    <Route 
                        exact path='/#/World' 
                        render={() => <MyNavbar display='tabs' checked={this.state.checked} handleSourceChange={this.handleSourceChange}/>}
                    />
                    <Route 
                        exact path='/#/Politics' 
                        render={() => <MyNavbar display='tabs' checked={this.state.checked} handleSourceChange={this.handleSourceChange}/>}
                    />
                    <Route 
                        exact path='/#/Business' 
                        render={() => <MyNavbar display='tabs' checked={this.state.checked} handleSourceChange={this.handleSourceChange}/>}
                    />
                    <Route 
                        exact path='/#/Technology' 
                        render={() => <MyNavbar display='tabs' checked={this.state.checked} handleSourceChange={this.handleSourceChange}/>}
                    />
                    <Route 
                        exact path='/#/Sports' 
                        render={() => <MyNavbar display='tabs' checked={this.state.checked} handleSourceChange={this.handleSourceChange}/>}
                    />
                    <Route 
                        exact path='/#/' 
                        render={() => <MyNavbar display='tabs' checked={this.state.checked} handleSourceChange={this.handleSourceChange}/>}
                    />
                    <Route 
                        exact path='/' 
                        render={() => <MyNavbar display='tabs' checked={this.state.checked} handleSourceChange={this.handleSourceChange}/>}
                    />
                </Switch>
                <Switch>
                    <Route exact path='/#/article' component={Article} />
                    <Route exact path='/#/search' component={Result} />
                    <Route exact path='/#/favorites' component={Favorites} />
                    <Route 
                        exact path='/#/World' 
                        render={() => <NewsList source={this.state.source} section='world' />}
                    />
                    <Route 
                        exact path='/#/Politics' 
                        render={() => <NewsList source={this.state.source} section='politics' />}
                    />
                    <Route 
                        exact path='/#/Business' 
                        render={() => <NewsList source={this.state.source} section='business' />}
                    />
                    <Route 
                        exact path='/#/Technology' 
                        render={() => <NewsList source={this.state.source} section='technology' />}
                    />
                    <Route 
                        exact path='/#/Sports' 
                        render={() => <NewsList source={this.state.source} section='sports' />}
                    />
                    <Route
                        exact path='/#/'
                        render={() => <NewsList source={this.state.source} section='home' />}
                    />
                    <Route
                        exact path='/'
                        render={() => <NewsList source={this.state.source} section='home' />}
                    />
                </Switch>
            </div>
        );
    }
}

export default App;