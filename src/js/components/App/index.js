import PerformanceX from 'components/PerformanceX';
class App extends React.Component {
    render () {
        return (
            <div className="admin-app full-height">
                {this.props.children}
            </div>
        );
    }
}
App = PerformanceX(App);
export default App;
