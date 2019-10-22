import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import cookie2 from 'react-cookies';
import { Redirect } from 'react-router';
import Axios from 'axios';
import lib from './../isLogin';
import course from "./course";

class CourseHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: lib.getUser()['email'],
            type: lib.getUser()['type'],
            courses: []
            //courseID: []
        }
        console.log("Inside courseHome page")
    }

    componentWillMount() {
        console.log("did mount of main page");
        const { email } = this.state;
        const { type } = this.state;
       //const { courseID} = this.state;
        console.log("Email: " + email);
        console.log("TypeOfUser: " + type);
       // console.log("course id:", courseID);
        Axios.get("http://localhost:3001/mainPage", { params: { email: email, type: type} })
            .then(response => {
                //   const parsedResponse = JSON.parse(res); --------------> This does not workfor reading response
                // console.log("Response data:"+response.data[0].name);  ---------> This works. Since only 1 array of response is received, we are using response[0]
                console.log("All courses response data -- Course Home",response.data)
                if (response.status == 200) {
                    // console.log("Response.data: "+response.data[0].coursename);
                
                    this.setState(
                        {
                            
                            courses: this.state.courses.concat(response.data),
                           // courseID: response.data.courseID
                        });
                    

                }

            });
    }

    render() {
       
        
        return(
 
            <div>{lib.isFaculty() && <button type="button" className="btn btn-primary btn-sm" style={{ marginLeft: "30px" }}>
                <Link to="/createcourses">
                    Create New Course
                  </Link>
            </button>}
                <h3> Your Courses</h3>
                <br></br>
                { this.state.courses.map(course => {
                    console.log("xxx", course)
            return (
              <div>
                   

                <div
                  className="card text-white bg-primary mb-3"
                  style={{ width: "18rem" }}
                >
                  <br />

                  <div class="card-header bg-transparent border-success">
                    
                      {course.courseID}
                    
                  </div>
                  <div class="card-body text-dark ">
                    <h5 class="card-title">{course.courseName}</h5>
                    <button className="btn btn-primary">
                      <Link to={`/courses/${course.courseID}`}>
                        Go to Course
                      </Link>
                    </button>
                    <br /> <br />
                  </div>
                </div>
                <br /> <br /> <br />
              </div>
            );

        
            }
          )}
      
                </div>  
                
                )  

                  }
            
      }
export default CourseHome;