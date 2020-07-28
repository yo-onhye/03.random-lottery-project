import React, { Component } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import Login from "./components/login";
import Lnb from "./components/lnb";
import Youtube from "./components/youtube";
import "./App.css";

class App extends Component {
	id = 2;
	dataId = 2;
	state = {
		userId: "",
		userPw: "",
		channelId: "",
		channelName: "",
		channelDatas: [
			{
				id: 0,
				channelId: "PLr0T5CaHaPwVVVUeriESL3fyfF3eRUuHr",
				channelName: "[🧑‍⚕️슬기로운 의사생활] 미도와 파라솔",
			},
			{
				id: 1,
				channelId: "PLdyB3s37qpTPuJSn-LjZqBFuf7u-XmA1z",
				channelName: "사이코지만 괜찮아",
			},
		],
		userDatas: [
			{
				dataId: 0,
				userDataId: "user111",
				userDataPw: "user111!",
			},
			{
				dataId: 1,
				userDataId: "user222",
				userDataPw: "user222!",
			},
		],
		vaildAccount: true,
		isShow: false,
	};

	checkUserAccount = (e) => {
		e.preventDefault();

		const { userDatas, userId, userPw } = this.state;
		if (userId !== "" && userPw !== "") {
			const userData = userDatas.find((userData) => userData.userDataId === userId && userData.userDataPw === userPw);
			if (userData === undefined) {
				this.setState({
					vaildAccount: false,
				});
			} else {
				this.setState({
					vaildAccount: true,
				});
			}
			return userData;
		} else {
			this.setState({
				vaildAccount: false,
			});
		}
	};

	handleLnb = (e) => {
		e.preventDefault();
		const { isShow } = this.state;

		if (!isShow) {
			this.setState({
				isShow: true,
			});
		} else {
			this.setState({
				isShow: false,
			});
		}
	};

	handleChange = (e) => {
		const { value, name } = e.target;
		this.setState({
			[name]: value,
		});
	};

	handleInsert = (e) => {
		e.preventDefault();

		const { channelDatas, channelId, channelName } = this.state;
		this.setState({
			channelDatas: channelDatas.concat({
				id: this.id,
				channelId,
				channelName,
			}),
			channelId: "",
			channelName: "",
			temp: {},
		});

		this.id++;
	};

	handleDelete = (id) => {
		this.setState({
			channelDatas: this.state.channelDatas.filter((user) => user.id !== id),
		});
	};

	render() {
		const { isShow, userId, userPw, vaildAccount, channelId, channelName, channelDatas, userDatas } = this.state;
		return (
			<div className='projectMain'>
				<div className='projcetLogo'>
					<h1>
						Pick Channel<span>.</span>
					</h1>
				</div>
				<nav className='projcetNav'>
					<ul className='projcetNavList'>
						{channelDatas.map((d) => {
							return (
								<li key={d.id}>
									<NavLink to={`/04.project-pick-channel/${d.id}`} activeClassName='active'>
										<span>#</span> {d.channelName}
									</NavLink>
								</li>
							);
						})}
					</ul>
				</nav>
				<OutsideClickHandler onOutsideClick={isShow && this.handleLnb}>
					<Lnb channelId={channelId} channelName={channelName} data={channelDatas} isShow={isShow} onActiveLnb={this.handleLnb} onInsert={this.handleInsert} onChange={this.handleChange} onDelete={this.handleDelete} />
				</OutsideClickHandler>
				<Switch>
					<Route exact path='/04.project-pick-channel' render={() => <Login data={userDatas} userId={userId} userPw={userPw} vaildAccount={vaildAccount} onChange={this.handleChange} onCheckVaild={this.checkUserAccount} />} />
					{channelDatas.map((d) => {
						return <Route path={`/04.project-pick-channel/${d.id}`} render={() => <Youtube channelName={d.channelName} channelId={d.channelId} />} />;
					})}
					<Route render={() => <div className='projectError'>404 NOT FOUND :(</div>} />
				</Switch>
			</div>
		);
	}
}
export default App;
