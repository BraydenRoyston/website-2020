import React, { Component } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

import styles from "./styles.module.css";

import { getJwt } from "../../utils/Cognito/index.js";
import { getApplication } from "../../utils/API/index.js";

export default class ApplicationViewPage extends Component {
  constructor(props) {
    super(props);
    var jwt = getJwt();
    var dataRetrieved = false;

    this.state = {
      err: false,
      errMessage: "",
      id: "",
      data: {},
      dataRetrieved: false,
    };

    // handle users who are not logged in
    if (!jwt) {
      this.props.history.push({
        pathname: "/login",
      });
    }
    // handle users who are not execs
    // if (getRoleFromJwt() != "exec") {
    //     this.props.history.push({
    //       pathname: "/dashboard",
    //     });
    // }
  }
  componentDidMount = () => {
    const url_split = window.location.href.split("application/");
    const id = url_split[1];
    this.setState({
      id: id,
    });
    getApplication(
      id,
      (data) => {
        if (data) {
          this.setState({
            dataRetrieved: true,
            data: Object.entries(data),
            first_name: data.first_name ?? "Na",
            last_name: data.last_name ?? "Na",
            submitted: data.submitted ?? "Na",
            phone_number: data.phone_number ?? "Na",
            birth_date: data.birth_date ?? "Na",
            gender: data.Gender ?? "Na",
            degree: data.degree ?? "Na",
            study_year: data.study_year ?? "Na",
            github_url: data.github_url ?? "Na",
            linkedin_url: data.linkedin_url ?? "Na",
            dribbble_url: data.dribbble_url ?? "Na",
            personal_url: data.personal_url ?? "Na",
            link_to_resume: data.link_to_resume ?? "Na",
            num_hackathons: data.num_hackathons ?? "Na",
            why_goldenhack: data.why_goldenhack ?? "Na",
            how_heard: data.how_heard ?? "Na",

            // if this field doesn't exist in the application then set it to an
            // empty array instead of just null
            school: data.school ?? [],
            ethnicity: data.ethnicity ?? [],
            program: data.program ?? [],
            coop_terms: data.coop_terms ?? [],
            streams: data.streams ?? [],

            loadComplete: true,
          });
        }
      },
      // If there was an error then there was no application in the db
      // so just initiate the
      () => {
        this.setState({
          dataRetrieved: false,
          phone_number: "",
          birth_date: "",
          gender: "",
          ethnicity: [],
          streams: [],
          school: [],
          degree: "",
          study_year: "",
          coop_terms: [],
          program: [],
          github_url: "",
          linkedin_url: "",
          dribbble_url: "",
          personal_url: "",
          link_to_resume: "",
          num_hackathons: "",
          how_heard: "",
          why_goldenhack: "",
          loadComplete: true,
        });
      }
    );
  };

  render() {
    if (this.state.dataRetrieved) {
      return (
        <div className={styles.container}>
          <div className={styles.title}>
            <p>Querying for application id: {this.state.id}</p>
          </div>
          <div className={styles.innerContainer}>
            <div className={styles.dataCard}>
              <p>
                Name: {this.state.first_name} {this.state.last_name}
              </p>
              <p>Gender: {this.state.gender}</p>
              <p>Birth Date: {this.state.birth_date}</p>
              <p>Ethnicity: {this.state.ethnicity}</p>
              <p>Number of Past Hackathons: {this.state.num_hackathons}</p>
            </div>
            <div className={styles.dataCard}>
              <p>School: {this.state.school}</p>
              <p>Study Year: {this.state.study_year}</p>
              <p>Degree: {this.state.degree}</p>
              <p>Next Co-op Term: {this.state.coop_terms}</p>
            </div>

            <div className={styles.dataCard}>
              <p>Resume: {this.state.link_to_resume}</p>
              <p>Github: {this.state.github_url}</p>
              <p>Personal: {this.state.personal_url}</p>
              <p>Dribble: {this.state.dribbble_url}</p>
            </div>
            <div className={styles.dataCard}>
              <p>RSVP Status: {this.state.school}</p>
              <p>Resume: {this.state.link_to_resume}</p>
              <p>Job Search Goal: {this.state.study_year}</p>
              <p>Shirt size: {this.state.degree}</p>
              <p>Dietary Restrictions: {this.state.link_to_resume}</p>
            </div>
          </div>
          <div className={styles.dataCard}>
            <p>Question 1</p>
            <p></p>
            <p>Question 2</p>
            <p></p>
            <p>Question 3</p>
            <p></p>
          </div>

          <h1>Raw Hacker Data</h1>
          <ul>
            {this.state.data.map((val) => (
              <li>
                {val[0]}: {val[1]}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div className={styles.loading}>
          <LoadingSpinner />
        </div>
      );
    }
  }
}
