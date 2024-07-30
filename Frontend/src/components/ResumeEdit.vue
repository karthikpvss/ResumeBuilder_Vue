<template>
    <br/>
    <v-container fluid variant="outlined">
      <v-stepper :items="jobItmes">
        <template v-slot:item.1>
          <v-card title="Job details" flat>
            <v-textarea
              label="Job Description"
              v-model="jobdescription"
              variant="filled"
              auto-grow
            ></v-textarea>
            <v-text-field
              v-model="jobtitle"
              class="mb-2"
              label="Job Title"
              hide-details
            ></v-text-field>
          </v-card>

          <v-card title="Personal details" flat>
            <v-row>
              <v-col cols="12">
                <v-text-field
                v-model="fullName"
                class="mb-2"
                label="Full Name"
                hide-details
                ></v-text-field>
              </v-col>
            </v-row>  
            
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="email"
                  class="mb-2"
                  label="Email"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="phoneNumber"
                  class="mb-2"
                  label="Phone Number"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row> 

            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="location"
                  class="mb-2"
                  label="Location"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row> 

            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="linkedinURL"
                  class="mb-2"
                  label="Linkedin URL"
                  hide-details
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="websiteURL"
                  class="mb-2"
                  label="Website URL"
                  hide-details
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>

          </v-card>
        </template>

        <template v-slot:item.2>
          <v-card title="Professional Summary" >
            <br/>
            <v-row class="ml-3">
              <v-textarea
                  label="Professional Summary"
                  v-model="professionalSummary"
                  variant="filled"
                  rows="15"
                  auto-grow
                ></v-textarea>
            </v-row> 
            <br/>
          </v-card>
        </template>

        <template v-slot:item.3>
          <v-card title="Education" >
            <br/>
            <v-row class="ml-3">
              <v-col cols="4"  class="border border-md">

                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="institution"
                      class="mb-2"
                      label="Institution"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="major"
                      class="mb-2"
                      label="Major"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="degree"
                      class="mb-2"
                      label="Degree"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="gpa"
                      class="mb-2"
                      label="GPA"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="eduStartDate"
                      class="mb-2"
                      label="Start Date (mmm/yyyy or mm/dd/yyyy)"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="eduEndDate"
                      class="mb-2"
                      label="End Date (mmm/yyyy or mm/dd/yyyy)"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="eduLocation"
                      class="mb-2"
                      label="Location"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="3">
                    <v-btn
                    color="#711429"
                    variant="elevated"
                    rounded="xl"
                    @click="this.awardsOverlay = !this.awardsOverlay"
                    block
                    >
                      Awards
                    </v-btn>
                  </v-col>
                  <v-col cols="3">
                    <v-btn
                    color="#711429"
                    variant="elevated"
                    rounded="xl"
                    @click="this.coursesOverlay = !this.coursesOverlay"
                    block
                    >
                      Courses
                    </v-btn>
                  </v-col>
                  <v-col cols="3">
                    <v-spacer></v-spacer>
                    <v-btn
                    color="#711429"
                    variant="elevated"
                    rounded="xl"
                    @click="clearEducationFeilds"
                    block
                    >
                      Clear
                    </v-btn>
                  </v-col>
                  <v-col cols="3">
                    <v-spacer></v-spacer>
                    <v-btn
                    color="#711429"
                    variant="elevated"
                    rounded="xl"
                    @click="addEducation"
                    block
                    >
                      Add
                    </v-btn>
                  </v-col>
                </v-row>

              </v-col>

              <v-col cols="8">
                <p>Added Educations: </p>
                <br/>
                <v-row v-for="(edu,index) in selectedEducationDetails">
                  <v-col cols="1"><v-icon color="#fff" > mdi-arrow-right  </v-icon></v-col>
                  <v-col cols="9">
                    <div>
                      <h3>{{edu.instituteName}}</h3>
                      <p>Major: {{ edu.major }} || Location: {{ edu.location }} || {{ edu.startDate }} - {{ edu.endDate }} || GPA: {{ edu.gpa }}</p>
                      <h4>Awards</h4>
                      <p v-for="award in edu.awards">&nbsp;&nbsp;- {{ award }}</p>
                      <h4>Courses</h4>
                      <p v-for="course in edu.courses">&nbsp;&nbsp;- {{ course }}</p>
                    </div>
                  </v-col>
                  <v-col cols="2">
                    <v-btn size="small" variant="tonal" @click="removeEducation(index)">
                      <v-icon color="#711429" > mdi-book-open  </v-icon>&nbsp;
                      Remove
                    </v-btn>
                  </v-col>
                  <v-divider></v-divider>
                </v-row>
              </v-col>
            </v-row> 
            <br/>
          </v-card>
        </template>

        <template v-slot:item.4>
          <v-card title="Experience">
            <br/>
            <v-row class="ml-3 mb-3">
              <v-col cols="4"  class="border border-md">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="employer"
                      class="mb-2"
                      label="Employer"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="jobTitle"
                      class="mb-2"
                      label="Job Title"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="jobLocation"
                      class="mb-2"
                      label="Location"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="jobStartDate"
                      class="mb-2"
                      label="Start Date (mmm/yyyy or mm/dd/yyyy)"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="jobEndDate"
                      class="mb-2"
                      label="End Date (mmm/yyyy or mm/dd/yyyy)"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="4">
                    <v-btn
                      color="#711429"
                      variant="elevated"
                      rounded="xl"
                      @click="this.notesOverlay = !this.notesOverlay"
                      block
                    >
                      Notes
                    </v-btn>
                  </v-col>
                  <v-col cols="4">
                    <v-btn
                    color="#711429"
                    variant="elevated"
                    rounded="xl"
                    @click="clearExperienceFeilds"
                    block
                    >
                      Clear
                    </v-btn>
                  </v-col>
                  <v-col cols="4">
                    <v-btn
                    color="#711429"
                    variant="elevated"
                    rounded="xl"
                    @click="addExperience"
                    block
                    >
                      Add
                    </v-btn>
                  </v-col>
                </v-row>
                
              </v-col>

              <v-col cols="8">
                <p>Added Experiences: </p>
                <br/>
                <v-row v-for="(exp,index) in selectedExperienceDetails">
                  <v-col cols="1"><v-icon color="#fff" > mdi-arrow-right  </v-icon></v-col>
                  <v-col cols="9">
                    <div>
                      <h3>{{exp.orgName}}</h3>
                      <p>{{ exp.roleName }} || Location: {{ exp.location }} || {{ exp.startDate }} - {{ exp.endDate }}</p>
                      <p v-for="note in exp.experienceNotes">&nbsp;&nbsp;- {{ note }}</p>
                    </div>
                  </v-col>
                  <v-col cols="2">
                    <v-btn size="small" variant="tonal" @click="removeExperience(index)">
                      <v-icon color="#711429" > mdi-book-open  </v-icon>&nbsp;
                      Remove
                    </v-btn>
                  </v-col>
                  <v-divider></v-divider>
                </v-row>
              </v-col>
            </v-row> 
          </v-card>
        </template>

        <template v-slot:item.5>
          <v-alert
            variant="outlined"
            type="warning"
            prominent
            border="top"
          >
            This section is only applicable for Template 4
          </v-alert>
          <v-card title="Leadership">
            <br/>
            <v-row class="ml-3 mb-3">
              <v-col cols="4"  class="border border-md">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="leadershipOrgName"
                      class="mb-2"
                      label="Organization Name"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="leadershipPosition"
                      class="mb-2"
                      label="Position Title"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="leadershipStartDate"
                      class="mb-2"
                      label="Start Date (mmm/yyyy or mm/dd/yyyy)"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="leadershipEndDate"
                      class="mb-2"
                      label="End Date (mmm/yyyy or mm/dd/yyyy)"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="4">
                    <v-btn
                      color="#711429"
                      variant="elevated"
                      rounded="xl"
                      @click="this.leadershipNotesOverlay = !this.leadershipNotesOverlay"
                      block
                    >
                      Notes
                    </v-btn>
                  </v-col>
                  <v-col cols="4">
                    <v-btn
                    color="#711429"
                    variant="elevated"
                    rounded="xl"
                    @click="clearLeadershipFeilds"
                    block
                    >
                      Clear
                    </v-btn>
                  </v-col>
                  <v-col cols="4">
                    <v-btn
                    color="#711429"
                    variant="elevated"
                    rounded="xl"
                    @click="addLeadership"
                    block
                    >
                      Add
                    </v-btn>
                  </v-col>
                </v-row>
                
              </v-col>

              <v-col cols="8">
                <p>Added Leaderships: </p>
                <br/>
                <v-row v-for="(leadership,index) in selectedLeadership">
                  <v-col cols="1"><v-icon color="#fff" > mdi-arrow-right  </v-icon></v-col>
                  <v-col cols="9">
                    <div>
                      <h3>{{leadership.orgName}}</h3>
                      <p>{{ leadership.leadershipPosition }} ( {{ leadership.startDate }} - {{ leadership.endDate }} )</p>
                      <p v-for="note in leadership.leadershipNotes">&nbsp;&nbsp;- {{ note }}</p>
                    </div>
                  </v-col>
                  <v-col cols="2">
                    <v-btn size="small" variant="tonal" @click="removeLeadership(index)">
                      <v-icon color="#711429" > mdi-book-open  </v-icon>&nbsp;
                      Remove
                    </v-btn>
                  </v-col>
                  <v-divider></v-divider>
                </v-row>
              </v-col>
            </v-row> 
          </v-card>
        </template>

        <template v-slot:item.6>
          <v-alert
            variant="outlined"
            type="warning"
            prominent
            border="top"
          >
            This section is only applicable for Template 4
          </v-alert>
          <v-card title="Honors/Awards">
            <br/>
            <v-row class="ml-3 mb-3">
              <v-col cols="4"  class="border border-md">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="honorOrAward"
                      class="mb-2"
                      label="Honor / Award"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="honorOrg"
                      class="mb-2"
                      label="Organization"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="honorStartDate"
                      class="mb-2"
                      label="Start Date (mmm/yyyy or mm/dd/yyyy)"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="honorEndDate"
                      class="mb-2"
                      label="End Date (mmm/yyyy or mm/dd/yyyy)"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="4">
                    <v-btn
                      color="#711429"
                      variant="elevated"
                      rounded="xl"
                      @click="this.honorNotesOverlay = !this.honorNotesOverlay"
                      block
                    >
                      Notes
                    </v-btn>
                  </v-col>
                  <v-col cols="4">
                    <v-btn
                    color="#711429"
                    variant="elevated"
                    rounded="xl"
                    @click="clearHonorFeilds"
                    block
                    >
                      Clear
                    </v-btn>
                  </v-col>
                  <v-col cols="4">
                    <v-btn
                    color="#711429"
                    variant="elevated"
                    rounded="xl"
                    @click="addHonor"
                    block
                    >
                      Add
                    </v-btn>
                  </v-col>
                </v-row>
                
              </v-col>

              <v-col cols="8">
                <p>Added Honors/Awards: </p>
                <br/>
                <v-row v-for="(honor,index) in selectedHonors">
                  <v-col cols="1"><v-icon color="#fff" > mdi-arrow-right  </v-icon></v-col>
                  <v-col cols="9">
                    <div>
                      <h3>{{honor.honorOrg}}</h3>
                      <p>{{ honor.name }} || {{ honor.startDate }} - {{ honor.endDate }}</p>
                      <p v-for="note in honor.honorNotes">&nbsp;&nbsp;- {{ note }}</p>
                    </div>
                  </v-col>
                  <v-col cols="2">
                    <v-btn size="small" variant="tonal" @click="removeHonor(index)">
                      <v-icon color="#711429" > mdi-book-open  </v-icon>&nbsp;
                      Remove
                    </v-btn>
                  </v-col>
                  <v-divider></v-divider>
                </v-row>
              </v-col>
            </v-row> 
          </v-card>
        </template>
      
        <template v-slot:item.7>
          <v-card title="Skills" flat>
            <br/>
            <v-row class="ml-3 mb-3">
              <v-col cols="4"  class="border border-md">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="skillName"
                      class="mb-2"
                      label="Skill Name"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="skillLevel"
                      class="mb-2"
                      label="Skill Level"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="3"></v-col>
                  <v-col cols="6">
                    <v-btn
                    color="#711429"
                    size="large"
                    variant="elevated"
                    rounded="xl"
                    @click="addSkill"
                    block
                  >
                    Add
                  </v-btn>
                  </v-col>
                  <v-col cols="3"></v-col>
                </v-row>
                
              </v-col>
              <v-col cols="8">
                <p>Added Skills: </p>
                <br/>
                <v-row v-for="(skill,index) in selectedSkills">
                  <v-col cols="1"><v-icon color="#fff" > mdi-arrow-right  </v-icon></v-col>
                  <v-col cols="9">
                    <div>
                      <h3>{{skill.name}}</h3>
                      <p>{{ skill.level }}</p>
                    </div>
                  </v-col>
                  <v-col cols="2">
                    <v-btn size="small" variant="tonal" @click="removeSkill(index)">
                      <v-icon color="#711429" > mdi-book-open  </v-icon>&nbsp;
                      Remove
                    </v-btn>
                  </v-col>
                  <v-divider></v-divider>
                </v-row>
              </v-col>
            </v-row> 
          </v-card>
        </template>

        <template v-slot:item.8>
          <v-alert
            variant="outlined"
            type="warning"
            prominent
            border="top"
          >
            This section is only applicable for Template 3
          </v-alert>
          <v-card title="Projects">
            <br/>
            <v-row class="ml-3 mb-3">
              <v-col cols="4"  class="border border-md">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="projectOrg"
                      class="mb-2"
                      label="Institution"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="projectName"
                      class="mb-2"
                      label="Project Title"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="projectOrgLocation"
                      class="mb-2"
                      label="Institute Location"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="projectStartDate"
                      class="mb-2"
                      label="Start Date (mmm/yyyy or mm/dd/yyyy)"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="projectEndDate"
                      class="mb-2"
                      label="End Date (mmm/yyyy or mm/dd/yyyy)"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="4">
                    <v-btn
                      color="#711429"
                      variant="elevated"
                      rounded="xl"
                      @click="this.projectNotesOverlay = !this.projectNotesOverlay"
                      block
                    >
                      Notes
                    </v-btn>
                  </v-col>
                  <v-col cols="4">
                    <v-btn
                    color="#711429"
                    variant="elevated"
                    rounded="xl"
                    @click="clearProjectFeilds"
                    block
                    >
                      Clear
                    </v-btn>
                  </v-col>
                  <v-col cols="4">
                    <v-btn
                    color="#711429"
                    variant="elevated"
                    rounded="xl"
                    @click="addProject"
                    block
                    >
                      Add
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="8">
                <p>Added Projects: </p>
                <br/>
                <v-row v-for="(project,index) in selectedProjects">
                  <v-col cols="1"><v-icon color="#fff" > mdi-arrow-right  </v-icon></v-col>
                  <v-col cols="9">
                    <div>
                      <h3>{{project.orgName}}</h3>
                      <p>{{ project.projectName }} || Location: {{ project.location }} || {{ project.startDate }} - {{ project.endDate }}</p>
                      <p v-for="note in project.projectNotes">&nbsp;&nbsp;- {{ note }}</p>
                    </div>
                  </v-col>
                  <v-col cols="2">
                    <v-btn size="small" variant="tonal" @click="removeProject(index)">
                      <v-icon color="#711429" > mdi-book-open  </v-icon>&nbsp;
                      Remove
                    </v-btn>
                  </v-col>
                  <v-divider></v-divider>
                </v-row>
              </v-col>
            </v-row> 
          </v-card>
        </template>

        <template v-slot:item.9>
          <v-card flat>
            <v-row>
              <v-col cols="4">
                <v-text-field
                v-model="resumeTitle"
                class="mb-2"
                label="Resume Title"
                hide-details
              ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="tempalte"
                  :items="tempalteItems"
                  label="Choose Template"
                  required
                ></v-select>
              </v-col>
              <v-col cols="1">
                <v-btn
                  color="#711429"
                  size="large"
                  variant="elevated"
                  rounded="xl"
                  @click="preview"
                  block
                >
                  Preview
                </v-btn>
              </v-col>
              <v-col cols="1">
                <v-btn
                  color="#711429"
                  size="large"
                  variant="elevated"
                  rounded="xl"
                  @click="getMatchScore"
                  block
                >
                  Match Score
                </v-btn>
              </v-col>
              <v-col cols="1">
                <v-btn
                  color="#711429"
                  size="large"
                  variant="elevated"
                  rounded="xl"
                  @click="saveOnClick"
                  block
                >
                  Save
                </v-btn>
              </v-col>
              <v-col cols="1">
                <v-btn
                  color="#711429"
                  size="large"
                  variant="elevated"
                  rounded="xl"
                  block
                  @click="exportToPDF"
                >
                  Download
                </v-btn>
              </v-col>
            </v-row>
          </v-card>

          <v-row>
            <v-col cols="9">
            <v-card flat v-if="tempalte == 'Template 1' && showTemplate" width="70%" color="#fff">
              <vue-html2pdf
              :show-layout="false"
              :preview-modal="true"
              :paginate-elements-by-height="10"
              :pdf-quality="2"
              pdf-format="a4"
              :ref="ref"
              id= "template1ResumePDF"
            >
                    <section class="pdf-item">
                      <v-card class="mx-auto px-10 py-8 overflow-y-auto" color="#fff">
                        <div style="text-align:center;">
                          <h2>{{ resumeDetails.fullName }}</h2>
                          <p>{{ resumeDetails.location }} | {{ resumeDetails.phoneNumber }} | {{ resumeDetails.email }} | {{ resumeDetails.linkedinURL }}/{{ resumeDetails.websiteURL }}</p>
                          <hr/>
                        </div>

                        <div>
                          <br/>
                          <h3>PROFESSIONAL SUMMARY</h3>
                          <hr/>
                          <p>
                            {{ resumeDetails.professionalSummary }}
                          </p>
                        </div>

                        <div>
                          <br/>
                          <h3>EDUCATION</h3>
                          <hr/>
                          <div v-for="edu in resumeDetails.educationDetails">
                            <br/>
                            <v-row class="px-3">
                              <p style="font-size:16px;">
                                <b>{{ edu.instituteName }}, {{ edu.location }} </b>
                              </p>
                              <v-spacer></v-spacer>
                              <p style="font-size:14px;">
                                {{ edu.startDate }} - {{ edu.endDate }}
                              </p>
                            </v-row>
                            <br style="line-height:0px;margin: 6px 0;display: block;"/>
                            <div style="font-size:14px;">
                              <p>{{ edu.degree }}</p>
                              <p>GPA: {{ edu.gpa }}</p>
                              <p>Awards: {{ edu.awards.toString() }}</p>
                              <p>Courses: {{ edu.courses.toString() }}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <br/>
                          <h3>PROFESSIONAL EXPERIENCE</h3>
                          <hr/>
                          <div v-for="experience in resumeDetails.experienceDetails">
                            <br/>
                            <v-row class="px-3">
                              <p  style="font-size:16px;">
                                <b>{{ experience.orgName }}, {{ experience.roleName }}, {{ experience.location }} </b>
                              </p>
                              <v-spacer></v-spacer>
                              <p>
                                Date ({{ experience.startDate }} - {{ experience.endDate }})
                              </p>
                            </v-row>
                            <br style="line-height:0px;margin: 6px 0;display: block;"/>
                            <div style="font-size:14px;">
                              <p v-for="note in experience.experienceNotes">●	{{ note }}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <br/>
                          <h3>SKILLS | LEADERSHIP SKILLS | ACTIVITIES | EXTRACURRICULAR ACTIVITIES</h3>
                          <hr/>
                          <p v-for="skill in resumeDetails.skills">●	{{ skill.name }} : {{ skill.level }}</p>

                        </div>
                      </v-card>
              </section>
            </vue-html2pdf>
            </v-card>

            <v-card flat v-if="tempalte == 'Template 2' && showTemplate" width="70%" color="#fff">
              <vue-html2pdf
              :show-layout="false"
              :preview-modal="true"
              :paginate-elements-by-height="10"
              :pdf-quality="2"
              pdf-format="a4"
              :ref="ref"
              id= "template2ResumePDF"
            >
                    <section class="pdf-item">
                      <v-card class="mx-auto px-10 py-8 overflow-y-auto" color="#fff">
                        <div>
                          <h2>{{ resumeDetails.fullName }}</h2>
                          <p>{{ resumeDetails.location }} | {{ resumeDetails.phoneNumber }} | {{ resumeDetails.email }} | {{ resumeDetails.linkedinURL }}/{{ resumeDetails.websiteURL }}</p>
                        </div>

                        <div>
                          <br/>
                          <h3>PROFESSIONAL SUMMARY</h3>
                          <p>
                            {{ resumeDetails.professionalSummary }}
                          </p>
                        </div>

                        <div>
                          <br/>
                          <h3>EDUCATION</h3>
                          <div v-for="edu in resumeDetails.educationDetails">
                            <br/>
                            <v-row class="px-3">
                              <p style="font-size:16px;">
                                <b>{{ edu.instituteName }}, {{ edu.location }} </b> | {{ edu.startDate }} - {{ edu.endDate }}
                              </p>
                            </v-row>
                            <br style="line-height:0px;margin: 6px 0;display: block;"/>
                            <div style="font-size:14px;">
                              <p>{{ edu.degree }}</p>
                              <p>GPA: {{ edu.gpa }}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <br/>
                          <h3>EXPERIENCE</h3>
                          <div v-for="experience in resumeDetails.experienceDetails">
                            <br/>
                            <v-row class="px-3">
                              <p  style="font-size:16px;">
                                <b>{{ experience.roleName }}, {{ experience.orgName }}</b> | {{ experience.startDate }} - {{ experience.endDate }}
                              </p>
                            </v-row>
                            <br style="line-height:0px;margin: 6px 0;display: block;"/>
                            <div style="font-size:14px;">
                              <p v-for="note in experience.experienceNotes">●	{{ note }}</p>
                            </div>
                          </div>
                        </div>
                      </v-card>
              </section>
            </vue-html2pdf>
            </v-card>

            <v-card flat v-if="tempalte == 'Template 3' && showTemplate" width="70%" color="#fff">
              <vue-html2pdf
              :show-layout="false"
              :preview-modal="true"
              :paginate-elements-by-height="10"
              :pdf-quality="2"
              pdf-format="a4"
              :ref="ref"
              id= "template3ResumePDF"
            >
                    <section class="pdf-item">
                      <v-card class="mx-auto px-10 py-8 overflow-y-auto" color="#fff">
                        <div style="text-align:center;">
                          <h2>{{ resumeDetails.fullName }}</h2>
                          <p>{{ resumeDetails.location }} | {{ resumeDetails.phoneNumber }} | {{ resumeDetails.email }} | {{ resumeDetails.linkedinURL }}/{{ resumeDetails.websiteURL }}</p>
                          <hr/>
                        </div>

                        <div>
                          <br/>
                          <p>
                            {{ resumeDetails.professionalSummary }}
                          </p>
                        </div>

                        <div>
                          <br/>
                          <h3>EDUCATION</h3>
                          <hr/>
                          <div v-for="edu in resumeDetails.educationDetails">
                            <br/>
                            <v-row class="px-3">
                              <p style="font-size:16px;">
                                <b>{{ edu.instituteName }}, {{ edu.location }} </b>
                              </p>
                              <v-spacer></v-spacer>
                              <p style="font-size:14px;">
                                {{ edu.startDate }} - {{ edu.endDate }}
                              </p>
                            </v-row>
                            <br/>
                            <v-row class="px-3">
                              <p style="font-size:14px;">{{ edu.degree }}</p>
                              <v-spacer></v-spacer>
                              <p style="font-size:14px;">GPA: {{ edu.gpa }}</p>
                            </v-row>
                          </div>
                        </div>

                        <div>
                          <br/>
                          <h3>EXPERIENCE</h3>
                          <hr/>
                          <div v-for="experience in resumeDetails.experienceDetails">
                            <br/>
                            <v-row class="px-3">
                              <p  style="font-size:16px;">
                                <b>{{ experience.orgName }}, {{ experience.location }} </b>
                              </p>
                              <v-spacer></v-spacer>
                              <p>
                                {{ experience.startDate }} - {{ experience.endDate }}
                              </p>
                            </v-row>
                            <v-row class="px-3">
                              <p  style="font-size:16px;">{{ experience.roleName }}</p>
                            </v-row>

                            <br style="line-height:0px;margin: 6px 0;display: block;"/>
                            <div style="font-size:14px;">
                              <p v-for="note in experience.experienceNotes">●	{{ note }}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <br/>
                          <h3>PROJECTS</h3>
                          <hr/>
                          <div v-for="project in resumeDetails.projectDetails">
                            <br/>
                            <v-row class="px-3">
                              <p  style="font-size:16px;">
                                <b>{{ project.orgName }}, {{ project.location }} </b>
                              </p>
                              <v-spacer></v-spacer>
                              <p>
                                {{ project.startDate }} - {{ project.endDate }}
                              </p>
                            </v-row>
                            <v-row class="px-3">
                              <p  style="font-size:16px;">{{ project.projectName }}</p>
                            </v-row>

                            <br style="line-height:0px;margin: 6px 0;display: block;"/>
                            <div style="font-size:14px;">
                              <p v-for="note in project.projectNotes">●	{{ note }}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <br/>
                          <h3>SKILLS</h3>
                          <hr/>
                          <p>{{ formatSkills(resumeDetails.skills) }}</p>
                        </div>
                      </v-card>
              </section>
            </vue-html2pdf>
            </v-card>

            <v-card flat v-if="tempalte == 'Template 4' && showTemplate" width="70%" color="#fff">
              <vue-html2pdf
              :show-layout="false"
              :preview-modal="true"
              :paginate-elements-by-height="10"
              :pdf-quality="2"
              pdf-format="a4"
              :ref="ref"
              id= "template4ResumePDF"
            >
                    <section class="pdf-item">
                      <v-card class="mx-auto px-10 py-8 overflow-y-auto" color="#fff">
                        <div style="text-align:center;">
                          <h2>{{ resumeDetails.fullName }}</h2>
                          <p>{{ resumeDetails.location }} ♦ {{ resumeDetails.phoneNumber }} ♦ {{ resumeDetails.email }} ♦ {{ resumeDetails.linkedinURL }} or {{ resumeDetails.websiteURL }}</p>
                        </div>

                        <div>
                          <br/>
                          <h3>OBJECTIVE</h3>
                          <p>
                            {{ resumeDetails.professionalSummary }}
                          </p>
                        </div>

                        <div>
                          <br/>
                          <h3>EDUCATION</h3>
                          <div v-for="edu in resumeDetails.educationDetails">
                            <br style="line-height:0px;margin: 6px 0;display: block;"/>
                            <v-row class="px-3">
                              <p style="font-size:16px;">
                                <b>{{ edu.instituteName }}, {{ edu.location }} </b>
                              </p>
                              <v-spacer></v-spacer>
                              <p style="font-size:14px;">
                                {{ edu.startDate }} - {{ edu.endDate }}
                              </p>
                            </v-row>
                            <br/>
                            <v-row class="px-3">
                              <p style="font-size:14px;">{{ edu.degree }}</p>
                            </v-row>
                            <v-row class="px-3">
                              <p style="font-size:14px;">Cumulative GPR: {{ edu.gpa }}</p>
                            </v-row>
                            <v-row class="px-3">
                              <p>Coursework: {{ edu.courses.toString() }}</p>
                            </v-row>
                          <br/>

                          </div>
                        </div>

                        <div>
                          <h3>LEADERSHIP (or WORK EXPERIENCE, ACTIVITIES, VOLUNTEER WORK)</h3>
                          <div v-for="leadership in resumeDetails.leadershipDetails">
                            <br style="line-height:0px;margin: 6px 0;display: block;"/>
                            <v-row class="px-3">
                              <p  style="font-size:16px;">
                                <b>{{ leadership.orgName }}</b>
                              </p>
                              <v-spacer></v-spacer>
                              <p>
                                {{ leadership.startDate }} - {{ leadership.endDate }}
                              </p>
                            </v-row>
                            <v-row class="px-3">
                              <p  style="font-size:16px;">{{ leadership.leadershipPosition }}</p>
                            </v-row>

                            <br style="line-height:0px;margin: 6px 0;display: block;"/>
                            <div style="font-size:14px;">
                              <p v-for="note in leadership.leadershipNotes">●	{{ note }}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <br/>
                          <h3>WORK EXPERIENCE (or LEADERSHIP, ACTIVITIES, VOLUNTEER WORK)</h3>
                          <div v-for="experience in resumeDetails.experienceDetails">
                            <br style="line-height:0px;margin: 6px 0;display: block;"/>
                            <v-row class="px-3">
                              <p  style="font-size:16px;">
                                <b>{{ experience.orgName }}, {{ experience.location }} </b>
                              </p>
                              <v-spacer></v-spacer>
                              <p>
                                {{ experience.startDate }} - {{ experience.endDate }}
                              </p>
                            </v-row>
                            <v-row class="px-3">
                              <p  style="font-size:16px;">{{ experience.roleName }}</p>
                            </v-row>

                            <br style="line-height:0px;margin: 6px 0;display: block;"/>
                            <div style="font-size:14px;">
                              <p v-for="note in experience.experienceNotes">●	{{ note }}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <br/>
                          <h3>HONORS (and/or AWARDS)</h3>
                          <div v-for="honor in resumeDetails.honorDetails">
                            <br style="line-height:0px;margin: 6px 0;display: block;"/>
                            <v-row class="px-3">
                              <p  style="font-size:16px;">
                                <b>{{ honor.name }}/{{ honor.honorOrg }} </b>
                              </p>
                              <v-spacer></v-spacer>
                              <p>
                                {{ honor.startDate }} - {{ honor.endDate }}
                              </p>
                            </v-row>
                            <br style="line-height:0px;margin: 6px 0;display: block;"/>
                            <div style="font-size:14px;">
                              <p v-for="note in honor.honorNotes">●	{{ note }}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <br/>
                          <h3>SKILLS</h3>
                          <p v-for="skill in resumeDetails.skills">●	{{ skill.name }} : {{ skill.level }}</p>
                        </div>

                      </v-card>
              </section>
            </vue-html2pdf>
            </v-card>
          </v-col>
            <v-col cols="3">
              <h3>Match Score:</h3>
              <h1>{{ matchScore }} </h1>
            </v-col>
          </v-row>
        </template>
      </v-stepper>
    </v-container>
    <br/>

    <v-overlay
      :model-value="awardsOverlay"
      class="align-center justify-center"
      persistent
    >
      <v-card class="mx-auto px-10 py-3" width="850px" height="80px" color="#711429">
        <v-row >
          <v-col cols="8"> 
            <v-text-field
                v-model="currentAward"
                class="mb-1"
                clearable
                label="Enter Award"
              ></v-text-field>
          </v-col>
          <v-col cols="2" class="py-5">
            <v-btn
              @click="addAward"
              color="#121212"
              block
            >
              Add
            </v-btn>
          </v-col>
          <v-col cols="2" class="py-5">
            <v-btn
              @click="this.awardsOverlay = !this.awardsOverlay"
              color="#121212"
              block
            >
              Done
            </v-btn>
          </v-col>
        </v-row>
      <br/>
      </v-card>
      <v-card class="mx-auto px-10 py-5" width="850px" height="500px">
        <v-row>
          <v-list>
            <v-list-item
              v-for="award in awards"
              :key="award"
              :title= "award"
              prepend-icon="mdi-arrow-right"
            >
              <v-spacer></v-spacer>
              <template v-slot:append>
                <v-btn size="small" variant="tonal" @click="removeAward(award)">
                  <v-icon color="#711429" > mdi-book-open  </v-icon>&nbsp;
                  Remove
                </v-btn>
                &nbsp;
              </template>
              <v-divider color="#fff"></v-divider>
            </v-list-item>
        </v-list>
        </v-row>
      </v-card>
    </v-overlay>

    <v-overlay
      :model-value="coursesOverlay"
      class="align-center justify-center"
      persistent
    >
      <v-card class="mx-auto px-10 py-3" width="850px" height="80px" color="#711429">
        <v-row >
          <v-col cols="8"> 
            <v-text-field
                v-model="currentCourse"
                class="mb-1"
                clearable
                label="Enter Course"
              ></v-text-field>
          </v-col>
          <v-col cols="2" class="py-5">
            <v-btn
              @click="addCourse"
              color="#121212"
              block
            >
              Add
            </v-btn>
          </v-col>
          <v-col cols="2" class="py-5">
            <v-btn
              @click="this.coursesOverlay = !this.coursesOverlay"
              color="#121212"
              block
            >
              Done
            </v-btn>
          </v-col>
        </v-row>
      <br/>
      </v-card>
      <v-card class="mx-auto px-10 py-5" width="850px" height="500px">
        <v-row>
          <v-list>
            <v-list-item
              v-for="course in courses"
              :key="course"
              :title= "course"
              prepend-icon="mdi-arrow-right"
            >
              <v-spacer></v-spacer>
              <template v-slot:append>
                <v-btn size="small" variant="tonal" @click="removeCourse(course)">
                  <v-icon color="#711429" > mdi-book-open  </v-icon>&nbsp;
                  Remove
                </v-btn>
                &nbsp;
              </template>
              <v-divider color="#fff"></v-divider>
            </v-list-item>
        </v-list>
        </v-row>
      </v-card>
    </v-overlay>

    <v-overlay
      :model-value="notesOverlay"
      class="align-center justify-center"
      persistent
    >
      <v-card class="mx-auto px-10 py-3" width="850px" height="80px" color="#711429">
        <v-row >
          <v-col cols="8"> 
            <v-text-field
                v-model="currentNote"
                class="mb-1"
                clearable
                label="Enter Note"
              ></v-text-field>
          </v-col>
          <v-col cols="2" class="py-5">
            <v-btn
              @click="addNote"
              color="#121212"
              block
            >
              Add
            </v-btn>
          </v-col>
          <v-col cols="2" class="py-5">
            <v-btn
              @click="this.notesOverlay = !this.notesOverlay"
              color="#121212"
              block
            >
              Done
            </v-btn>
          </v-col>
        </v-row>
      <br/>
      </v-card>
      <v-card class="mx-auto px-10 py-5" width="850px" height="500px">
        <v-row>
          <v-list>
            <v-list-item
              v-for="note in experienceNote"
              :key="note"
              :title= "note"
              prepend-icon="mdi-arrow-right"
            >
              <v-spacer></v-spacer>
              <template v-slot:append>
                <v-btn size="small" variant="tonal" @click="removeNote(note)">
                  <v-icon color="#711429" > mdi-book-open  </v-icon>&nbsp;
                  Remove
                </v-btn>
                &nbsp;
              </template>
              <v-divider color="#fff"></v-divider>
            </v-list-item>
          </v-list>
        </v-row>
      </v-card>
    </v-overlay>

    <v-overlay
      :model-value="leadershipNotesOverlay"
      class="align-center justify-center"
      persistent
    >
      <v-card class="mx-auto px-10 py-3" width="850px" height="80px" color="#711429">
        <v-row >
          <v-col cols="8"> 
            <v-text-field
                v-model="currentLeadershipNote"
                class="mb-1"
                clearable
                label="Enter Note"
              ></v-text-field>
          </v-col>
          <v-col cols="2" class="py-5">
            <v-btn
              @click="addLeadershipNote"
              color="#121212"
              block
            >
              Add
            </v-btn>
          </v-col>
          <v-col cols="2" class="py-5">
            <v-btn
              @click="this.leadershipNotesOverlay = !this.leadershipNotesOverlay"
              color="#121212"
              block
            >
              Done
            </v-btn>
          </v-col>
        </v-row>
      <br/>
      </v-card>
      <v-card class="mx-auto px-10 py-5" width="850px" height="500px">
        <v-row>
          <v-list>
            <v-list-item
              v-for="note in leadershipNotes"
              :key="note"
              :title= "note"
              prepend-icon="mdi-arrow-right"
            >
              <v-spacer></v-spacer>
              <template v-slot:append>
                <v-btn size="small" variant="tonal" @click="removeLeadershipNote(note)">
                  <v-icon color="#711429" > mdi-book-open  </v-icon>&nbsp;
                  Remove
                </v-btn>
                &nbsp;
              </template>
              <v-divider color="#fff"></v-divider>
            </v-list-item>
          </v-list>
        </v-row>
      </v-card>
    </v-overlay>

    <v-overlay
      :model-value="honorNotesOverlay"
      class="align-center justify-center"
      persistent
    >
      <v-card class="mx-auto px-10 py-3" width="850px" height="80px" color="#711429">
        <v-row >
          <v-col cols="8"> 
            <v-text-field
                v-model="currentHonorNote"
                class="mb-1"
                clearable
                label="Enter Note"
              ></v-text-field>
          </v-col>
          <v-col cols="2" class="py-5">
            <v-btn
              @click="addHonorNote"
              color="#121212"
              block
            >
              Add
            </v-btn>
          </v-col>
          <v-col cols="2" class="py-5">
            <v-btn
              @click="this.honorNotesOverlay = !this.honorNotesOverlay"
              color="#121212"
              block
            >
              Done
            </v-btn>
          </v-col>
        </v-row>
      <br/>
      </v-card>
      <v-card class="mx-auto px-10 py-5" width="850px" height="500px">
        <v-row>
          <v-list>
            <v-list-item
              v-for="note in honorNotes"
              :key="note"
              :title= "note"
              prepend-icon="mdi-arrow-right"
            >
              <v-spacer></v-spacer>
              <template v-slot:append>
                <v-btn size="small" variant="tonal" @click="removeHonorNote(note)">
                  <v-icon color="#711429" > mdi-book-open  </v-icon>&nbsp;
                  Remove
                </v-btn>
                &nbsp;
              </template>
              <v-divider color="#fff"></v-divider>
            </v-list-item>
          </v-list>
        </v-row>
      </v-card>
    </v-overlay>

    <v-overlay
      :model-value="projectNotesOverlay"
      class="align-center justify-center"
      persistent
    >
      <v-card class="mx-auto px-10 py-3" width="850px" height="80px" color="#711429">
        <v-row >
          <v-col cols="8"> 
            <v-text-field
                v-model="currentProjectNote"
                class="mb-1"
                clearable
                label="Enter Note"
              ></v-text-field>
          </v-col>
          <v-col cols="2" class="py-5">
            <v-btn
              @click="addProjectNote"
              color="#121212"
              block
            >
              Add
            </v-btn>
          </v-col>
          <v-col cols="2" class="py-5">
            <v-btn
              @click="this.projectNotesOverlay = !this.projectNotesOverlay"
              color="#121212"
              block
            >
              Done
            </v-btn>
          </v-col>
        </v-row>
      <br/>
      </v-card>
      <v-card class="mx-auto px-10 py-5" width="850px" height="500px">
        <v-row>
          <v-list>
            <v-list-item
              v-for="note in projectNotes"
              :key="note"
              :title= "note"
              prepend-icon="mdi-arrow-right"
            >
              <v-spacer></v-spacer>
              <template v-slot:append>
                <v-btn size="small" variant="tonal" @click="removeProjectNote(note)">
                  <v-icon color="#711429" > mdi-book-open  </v-icon>&nbsp;
                  Remove
                </v-btn>
                &nbsp;
              </template>
              <v-divider color="#fff"></v-divider>
            </v-list-item>
          </v-list>
        </v-row>
      </v-card>
    </v-overlay>

    <v-overlay
      :model-value="loadingOverlay"
      class="align-center justify-center"
      :persistent="diableOverlay"
    >
        <v-progress-circular
            color="#711429"
            indeterminate
            size="64"
            class="align-center"
        ></v-progress-circular>
        <h3>{{loadingMSG}}</h3>
    </v-overlay>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ snackbarMSG }}
    </v-snackbar>
  </template>
  
  <script>
  import html2pdf from "html2pdf.js";
  import ResumeService from '@/services/ResumeService'
  import router from '../router'
  import { CohereClient } from "cohere-ai"
  export default {
      data: () => ({
        step: null,
        currentStep: null,
        loadingMSG: null,
        loadingOverlay: false,
        diableOverlay: false,
        timeout: 2000,
        snackbar: false,
        snackbarMSG: "",
        jobItmes: ['Job and Personal details', "Professional Summary", 'Education', 'Experience', 'Leadership', 'Honors/Awards', 'Skills', 'Projects', 'Preview'],

        jobdescription: "",
        jobtitle: "",
        resumeID: null,

        fullName: "",
        email: "",
        phoneNumber: "",
        websiteURL: "",
        location: "",
        linkedinURL: "",

        professionalSummary:"",
        
        degree: "",
        major: "",
        institution: "",
        eduLocation: "",
        eduStartDate: "",
        eduEndDate: "",
        gpa: "",
        awards: [],
        courses: [],
        educationDetails: [],
        selectedEducationDetails: [],
        educationGenText: "",

        employer: "",
        jobTitle: "",
        jobLocation: "",
        jobStartDate: "",
        jobEndDate: "",
        experienceNote: [],
        experienceDetails: [],
        selectedExperienceDetails: [],

        leadershipOrgName: "",
        leadershipStartDate: "",
        leadershipEndDate: "",
        leadershipPosition: "",
        leadershipNotes: [],
        leadership: [],
        selectedLeadership: [],

        honorOrAward: "",
        honorOrg: "",
        honorStartDate: "",
        honorEndDate: "",
        honorNotes: [],
        honors: [],
        selectedHonors: [],

        skillName: "",
        skillLevel: "",
        skillGenerated: "",
        selectedSkills:[],
        skills: [],

        projectOrg:"",
        projectOrgLocation:"",
        projectName:"",
        projectStartDate:"",
        projectEndDate:"",
        projectNotes:[],
        projects:[],
        selectedProjects:[],

        tempalteItems: ['Template 1', 'Template 2', 'Template 3', 'Template 4'],
        tempalte: "",
        opt: {
            margin: 0,
            filename: 'myResume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        },

        awardsOverlay: false,
        currentAward: "",
        coursesOverlay: false,
        currentCourse: "",
        notesOverlay: false,
        currentNote: "",
        projectNotesOverlay: false,
        currentProjectNote: "",
        leadershipNotesOverlay: false,
        currentLeadershipNote: "",
        honorNotesOverlay: false,
        currentHonorNote: "",
        resumeDetails: null,
        showTemplate: false,
        resumeTitle: "",
        matchScore: "0"
      }),
  
      methods: {
        onLoad(){
           if(this.$store.state.resumeDetails != null){

                var stateResume = this.$store.state.resumeDetails

                stateResume.EducationDetails.forEach(eduElement => {
                    eduElement.Awards.forEach(awardElement => {
                        this.awards.push(awardElement.description)
                    });
                    eduElement.Courses.forEach(courseElement => {
                        this.courses.push(courseElement.description)
                    });
                    this.selectedEducationDetails.push({
                        instituteName: eduElement.instituteName,
                        degree: eduElement.degree,
                        location: eduElement.location,
                        major: eduElement.major,
                        startDate: eduElement.startDate,
                        endDate: eduElement.endDate,
                        gpa: eduElement.gpa,
                        awards: this.awards,
                        courses: this.courses
                    }) 
                    this.awards = []
                    this.courses = []
                });

                stateResume.ExperienceDetails.forEach(expElement => {
                    expElement.ExperienceNotes.forEach(expnoteElement => {
                        this.experienceNote.push(expnoteElement.description)
                    });
                    this.selectedExperienceDetails.push({
                        orgName: expElement.orgName,
                        roleName: expElement.roleName,
                        location: expElement.location,
                        startDate: expElement.startDate,
                        endDate: expElement.endDate,
                        experienceNotes: this.experienceNote
                    }) 
                    this.experienceNote = []
                });

                stateResume.Leaderships.forEach(leaderElement => {
                    leaderElement.LeadershipNotes.forEach(leadernoteElement => {
                        this.leadershipNotes.push(leadernoteElement.description)
                    });
                    this.selectedLeadership.push({
                        orgName: leaderElement.orgName,
                        startDate: leaderElement.startDate,
                        endDate: leaderElement.endDate,
                        leadershipPosition: leaderElement.leadershipPosition,
                        leadershipNotes: this.leadershipNotes
                    }) 
                    this.leadershipNotes = []
                });

                stateResume.Honors.forEach(honorElement => {
                    honorElement.HonorNotes.forEach(honorNoteElement => {
                        this.honorNotes.push(honorNoteElement.description)
                    });
                    this.selectedHonors.push({
                        name: honorElement.name,
                        honorOrg: honorElement.honorOrg,
                        startDate: honorElement.startDate,
                        endDate: honorElement.endDate,
                        honorNotes: this.honorNotes
                    }) 
                    this.honorNotes = []
                });

                stateResume.ProjectDetails.forEach(projectElement => {
                    projectElement.ProjectNotes.forEach(projectnoteElement => {
                        this.projectNotes.push(projectnoteElement.description)
                    });
                    this.selectedProjects.push({
                        orgName: projectElement.orgName,
                        location: projectElement.location,
                        projectName: projectElement.projectName,
                        startDate: projectElement.startDate,
                        endDate: projectElement.endDate,
                        projectNotes: this.projectNotes
                    }) 
                    this.projectNotes = []
                });

                stateResume.Skills.forEach(skillElement => {
                    this.selectedSkills.push({
                        name: skillElement.Name,
                        level: skillElement.level
                    }) 
                });

                this.professionalSummary = stateResume.professionalSummary
                this.jobdescription = stateResume.jobDescription
                this.jobtitle = stateResume.jobTitle
                this.resumeID = stateResume.ResumeId
                this.tempalte = stateResume.templaterType
                this.resumeTitle = stateResume.resumeTitle
                this.matchScore = stateResume.matchScore

                this.fullName = sessionStorage.getItem('UserName')
                this.location = sessionStorage.getItem('UserLocation')
                this.phoneNumber = sessionStorage.getItem('UserPhoneNumber')
                this.email = sessionStorage.getItem('UserEmail')
                this.linkedinURL = sessionStorage.getItem('UserLinkedinURL')
                this.websiteURL = sessionStorage.getItem('UserWebsiteURL')
               
                this.resumeDetails = {
                   fullName: this.fullName,
                   location: this.location,
                   phoneNumber: this.phoneNumber,
                   email: this.email,
                   websiteURL: this.websiteURL,
                   linkedinURL: this.linkedinURL,
                   professionalSummary: this.professionalSummary,
                   educationDetails: this.selectedEducationDetails,
                   experienceDetails: this.selectedExperienceDetails,
                   skills: this.selectedSkills,
                   jobdescription: this.jobdescription,
                   jobtitle: this.jobtitle
                }
            }
            else{
              router.push('/resume')
            }
        },
        clearFields(){
             
        },
        setLoadingOverLay(isShow, message){
            if(isShow){
                this.loadingOverlay = true
                this.loadingMSG = message
            }
            else{
                this.loadingOverlay = false
                this.loadingMSG = null
            }
        },
        showSnackBar(msg){
            this.snackbar = true
            this.snackbarMSG = msg
        },

        addEducation(){
          var educationDetail = {
            instituteName: this.institution,
            degree: this.degree,
            location: this.location,
            major: this.major,
            startDate: this.eduStartDate,
            endDate: this.eduEndDate,
            gpa: this.gpa,
            awards: this.awards,
            courses: this.courses
          }
          this.selectedEducationDetails.push(educationDetail)
          this.clearEducationFeilds()
        },
        removeEducation(index){
            if(this.selectedEducationDetails.length > 1){
              console.log(index)
              this.selectedEducationDetails.splice(index, 1);
            }
            else{
              this.selectedEducationDetails = []
            }
        },
        addAward(){
          if(this.currentAward != ""){
            this.awards.push(this.currentAward)
            this.currentAward = ""
          }
        },
        removeAward(award){
          if(award != ""){
            if(this.awards.length > 1){
              var index = this.awards.indexOf(award);
              console.log(award)
              console.log(index)
              this.awards.splice(index, 1);
            }
            else{
              this.awards = []
            }
          }
        },
        addCourse(){
          if(this.currentCourse != ""){
            this.courses.push(this.currentCourse)
            this.currentCourse = ""
          }
        },
        removeCourse(course){
          if(course != ""){
            if(this.courses.length > 1){
              var index = this.courses.indexOf(course);
              console.log(course)
              console.log(index)
              this.courses.splice(index, 1);
            }
            else{
              this.courses = []
            }
          }
        },
        clearEducationFeilds(){
          this.degree = ""
          this.major = ""
          this.institution = ""
          this.eduLocation = ""
          this.eduStartDate = ""
          this.eduEndDate = ""
          this.gpa = ""
          this.awards = []
          this.courses = []
        },
        
        addExperience(){
          var experienceDetail = {
            orgName: this.employer,
            roleName: this.jobTitle,
            location: this.jobLocation,
            startDate: this.jobStartDate,
            endDate: this.jobEndDate,
            experienceNotes: this.experienceNote
          }
          this.selectedExperienceDetails.push(experienceDetail)
          this.clearExperienceFeilds()
        },
        removeExperience(index){
            if(this.selectedExperienceDetails.length > 1){
              console.log(index)
              this.selectedExperienceDetails.splice(index, 1);
            }
            else{
              this.selectedExperienceDetails = []
            }
        },
        addNote(){
          if(this.currentNote != ""){
            this.experienceNote.push(this.currentNote)
            this.currentNote = ""
          }
        },
        removeNote(note){
          if(note != ""){
            if(this.experienceNote.length > 1){
              var index = this.experienceNote.indexOf(note);
              console.log(note)
              console.log(index)
              this.experienceNote.splice(index, 1);
            }
            else{
              this.experienceNote = []
            }
          }
        },
        clearExperienceFeilds(){
          this.employer = ""
          this.jobTitle = ""
          this.jobLocation = ""
          this.jobStartDate = ""
          this.jobEndDate = ""
          this.experienceNote = []
        },
        
        addLeadership(){
          var leadershipDetail = {
            orgName: this.leadershipOrgName,
            startDate: this.leadershipStartDate,
            endDate: this.leadershipEndDate,
            leadershipPosition: this.leadershipPosition,
            leadershipNotes: this.leadershipNotes
          }
          this.selectedLeadership.push(leadershipDetail)
          this.clearLeadershipFeilds()
        },
        removeLeadership(index){
            if(this.selectedLeadership.length > 1){
              console.log(index)
              this.selectedLeadership.splice(index, 1);
            }
            else{
              this.selectedLeadership = []
            }
        },
        addLeadershipNote(){
          if(this.currentLeadershipNote != ""){
            this.leadershipNotes.push(this.currentLeadershipNote)
            this.currentLeadershipNote = ""
          }
        },
        removeLeadershipNote(note){
          if(note != ""){
            if(this.leadershipNotes.length > 1){
              var index = this.leadershipNotes.indexOf(note);
              console.log(note)
              console.log(index)
              this.leadershipNotes.splice(index, 1);
            }
            else{
              this.leadershipNotes = []
            }
          }
        },
        clearLeadershipFeilds(){
          this.leadershipOrgName = ""
          this.leadershipPosition = ""
          this.leadershipStartDate = ""
          this.leadershipEndDate = ""
          this.leadershipNotes = []
        },
        
        addHonor(){
          var honorDetail = {
            name: this.honorOrAward,
            honorOrg: this.honorOrg,
            startDate: this.honorStartDate,
            endDate: this.honorEndDate,
            honorNotes: this.honorNotes
          }
          this.selectedHonors.push(honorDetail)
          this.clearHonorFeilds()
        },
        removeHonor(index){
            if(this.selectedHonors.length > 1){
              console.log(index)
              this.selectedHonors.splice(index, 1);
            }
            else{
              this.selectedHonors = []
            }
        },
        addHonorNote(){
          if(this.currentHonorNote != ""){
            this.honorNotes.push(this.currentHonorNote)
            this.currentHonorNote = ""
          }
        },
        removeHonorNote(note){
          if(note != ""){
            if(this.honorNotes.length > 1){
              var index = this.honorNotes.indexOf(note);
              console.log(note)
              console.log(index)
              this.honorNotes.splice(index, 1);
            }
            else{
              this.honorNotes = []
            }
          }
        },
        clearHonorFeilds(){
          this.honorOrAward = ""
          this.honorOrg = ""
          this.honorStartDate = ""
          this.honorEndDate = ""
          this.honorNotes = []
        },
        
        addProject(){
          var projectDetail = {
            orgName: this.projectOrg,
            location: this.projectOrgLocation,
            projectName: this.projectName,
            startDate: this.projectStartDate,
            endDate: this.projectEndDate,
            projectNotes: this.projectNotes
          }
          this.selectedProjects.push(projectDetail)
          this.clearProjectFeilds()
        },
        removeProject(index){
            if(this.selectedProjects.length > 1){
              console.log(index)
              this.selectedProjects.splice(index, 1);
            }
            else{
              this.selectedProjects = []
            }
        },
        addProjectNote(){
          if(this.currentProjectNote != ""){
            this.projectNotes.push(this.currentProjectNote)
            this.currentProjectNote = ""
          }
        },
        removeProjectNote(note){
          if(note != ""){
            if(this.projectNotes.length > 1){
              var index = this.projectNotes.indexOf(note);
              console.log(note)
              console.log(index)
              this.projectNotes.splice(index, 1);
            }
            else{
              this.projectNotes = []
            }
          }
        },
        clearProjectFeilds(){
          this.projectOrg = ""
          this.projectOrgLocation = ""
          this.projectName = ""
          this.projectStartDate = ""
          this.projectEndDate = ""
          this.projectNotes = []
        },

        addSkill(){
          var skill = {
            name: this.skillName,
            level: this.skillLevel
          }
          this.selectedSkills.push(skill)
          this.clearSkillFeilds()
        },
        removeSkill(index){
            if(this.selectedSkills.length > 1){
              console.log(index)
              this.selectedSkills.splice(index, 1);
            }
            else{
              this.selectedSkills = []
            }
        },
        clearSkillFeilds(){
          this.skillName = ""
          this.skillLevel = ""
        },

        preview(){
          this.resumeDetails = {
            fullName: this.fullName,
            location: this.location,
            phoneNumber: this.phoneNumber,
            email: this.email,
            websiteURL: this.websiteURL,
            linkedinURL: this.linkedinURL,
            professionalSummary: this.professionalSummary,
            educationDetails: this.selectedEducationDetails,
            experienceDetails: this.selectedExperienceDetails,
            leadershipDetails: this.selectedLeadership,
            honorDetails: this.selectedHonors,
            projectDetails: this.selectedProjects,
            skills: this.selectedSkills,
            jobdescription: this.jobdescription,
            jobtitle: this.jobtitle
          }
          this.showTemplate = true
        },
        formatSkills(skills){
          var formattedSkills = ""
          skills.forEach(element => {
            if(formattedSkills != ""){
              formattedSkills = formattedSkills + " | " + element.name
            }
            else{
              formattedSkills = element.name
            }
          });
          return formattedSkills
        },

        async saveOnClick() {
            try{
              this.setLoadingOverLay(true, "Please wait. Resume is being saved...")
              await ResumeService.saveResumeVersion({
                resumeID: this.resumeID,
                resumeTitle: this.resumeTitle,
                jobDescription: this.jobdescription,
                jobTitle: this.jobtitle,
                matchScore: this.matchScore,
                UserID: sessionStorage.getItem('UserId'),
                fullName: this.resumeDetails.fullName,
                location: this.resumeDetails.location, 
                phoneNumber: this.resumeDetails.phoneNumber,
                email: this.resumeDetails.email,
                professionalSummary: this.resumeDetails.professionalSummary,
                templaterType: this.tempalte,
                educationDetails: this.resumeDetails.educationDetails,
                experienceDetails: this.resumeDetails.experienceDetails,
                projectDetails: this.resumeDetails.projectDetails,
                skills: this.resumeDetails.skills,
                leadershipDetails: this.resumeDetails.leadershipDetails,
                honorDetails: this.resumeDetails.honorDetails,
              }).then((response)=> {
                console.log(response.statusText)
                if(response.statusText == "OK"){
                    if(response.data.status == "OK"){
                        this.showSnackBar("Resume Saved.")
                        this.setLoadingOverLay(false, "")
                        router.push('/resume')
                    }
                    else{
                        this.showSnackBar(response.data.error)
                    }
                }
                this.setLoadingOverLay(false, "")
             })
          }
          catch(err){
            console.log(err)
            this.setLoadingOverLay(false, "")
          }
        },

        
        async getMatchScore(){
          var resumeRequest = ""
          switch(this.tempalte){
            case "Template 1": 
              resumeRequest = this.resumeDetails.fullName + "\n" + this.resumeDetails.location + " | " + this.resumeDetails.phoneNumber + " | " + this.resumeDetails.email + " | " + this.resumeDetails.linkedinURL + "/" + this.resumeDetails.websiteURL
              resumeRequest = resumeRequest + "\n" +  this.resumeDetails.professionalSummary + "\n EDUCATION \n" 

              if(this.resumeDetails.educationDetails != null && this.resumeDetails.educationDetails.length > 0){
                this.resumeDetails.educationDetails.forEach(edu => {
                  resumeRequest = resumeRequest + " " + edu.instituteName + " ," + edu.location + " " + edu.startDate + "-" + edu.endDate + " " + edu.degree + "\n GPA: " + edu.gpa + "\n Awards: " + edu.awards.toString() + "\n Courses: " + edu.courses.toString()
                });
              }
              else{
                return
              }
              
              if(this.resumeDetails.experienceDetails != null && this.resumeDetails.experienceDetails.length > 0){
                resumeRequest = resumeRequest + "\n PROFESSIONAL EXPERIENCE \n"
                this.resumeDetails.experienceDetails.forEach(experience => {
                  resumeRequest = resumeRequest + " " + experience.orgName + " ," + experience.roleName + " ," + experience.location + " Date(" + experience.startDate + "-" + experience.endDate + ") \n" + experience.experienceNotes.toString()
                });
              }
              else{
                return
              }

              if(this.resumeDetails.skills != null && this.resumeDetails.skills.length > 0){
                resumeRequest = resumeRequest + "\n SKILLS | LEADERSHIP SKILLS | ACTIVITIES | EXTRACURRICULAR ACTIVITIES \n"
                this.resumeDetails.skills.forEach(skill => {
                  resumeRequest = resumeRequest + " " + skill.name + " - " + skill.level + "\n"
                });
              }
              else{
                return
              }
              
              break;
            case "Template 2":  
              resumeRequest = this.resumeDetails.fullName + "\n" + this.resumeDetails.location + " | " + this.resumeDetails.phoneNumber + " | " + this.resumeDetails.email + " | " + this.resumeDetails.linkedinURL + "/" + this.resumeDetails.websiteURL
              resumeRequest = resumeRequest + " OBJECTIVE " +  this.resumeDetails.professionalSummary + " EDUCATION " 

              if(this.resumeDetails.educationDetails != null && this.resumeDetails.educationDetails.length > 0){
                this.resumeDetails.educationDetails.forEach(edu => {
                  resumeRequest = resumeRequest + " " + edu.instituteName + " ," + edu.location + " " + edu.startDate + "-" + edu.endDate + " " + edu.degree + "\n GPA: " + edu.gpa
                });
              }
              else{
                return
              }
              
              if(this.resumeDetails.experienceDetails != null && this.resumeDetails.experienceDetails.length > 0){
                resumeRequest = resumeRequest + " EXPERIENCE "
                this.resumeDetails.experienceDetails.forEach(experience => {
                  resumeRequest = resumeRequest + experience.roleName + ", " + experience.orgName + " " + " " + experience.startDate + "-" + experience.endDate + " " + experience.experienceNotes.toString()
                });
              }
              else{
                return
              }

              break;
            case "Template 3": 
              resumeRequest = this.resumeDetails.fullName + "\n" + this.resumeDetails.location + " | " + this.resumeDetails.phoneNumber + " | " + this.resumeDetails.email + " | " + this.resumeDetails.linkedinURL + "/" + this.resumeDetails.websiteURL
              resumeRequest = resumeRequest + "\n" +  this.resumeDetails.professionalSummary + "\n EDUCATION \n" 

              if(this.resumeDetails.educationDetails != null && this.resumeDetails.educationDetails.length > 0){
                this.resumeDetails.educationDetails.forEach(edu => {
                  resumeRequest = resumeRequest + " " + edu.instituteName + " ," + edu.location + " " + edu.startDate + "-" + edu.endDate + " " + edu.degree + "\n GPA: " + edu.gpa
                });
              }
              else{
                return
              }
              
              if(this.resumeDetails.experienceDetails != null && this.resumeDetails.experienceDetails.length > 0){
                resumeRequest = resumeRequest + " EXPERIENCE "
                this.resumeDetails.experienceDetails.forEach(experience => {
                  resumeRequest = resumeRequest + " " + experience.orgName + " ," + experience.location + " " + experience.startDate + "-" + experience.endDate + " " + experience.roleName + " " + experience.experienceNotes.toString()
                });
              }
              else{
                return
              }

              if(this.resumeDetails.projectDetails != null && this.resumeDetails.projectDetails.length > 0){
                resumeRequest = resumeRequest + " PROJECTS "
                this.resumeDetails.projectDetails.forEach(project => {
                  resumeRequest = resumeRequest + " " + project.orgName + " ," + project.location + " " + project.startDate + "-" + project.endDate + " " + project.projectName + " " + experience.roleName + " " + project.projectNotes.toString()
                });
              }
              else{
                return
              }

              if(this.resumeDetails.skills != null && this.resumeDetails.skills.length > 0){
                resumeRequest = resumeRequest + " SKILLS "
                this.resumeDetails.skills.forEach(skill => {
                  resumeRequest = resumeRequest + " " + skill.name
                });
              }
              else{
                return
              }
              break;
            case "Template 4": 
              resumeRequest = this.resumeDetails.fullName + " " + this.resumeDetails.location + " | " + this.resumeDetails.phoneNumber + " | " + this.resumeDetails.email + " | " + this.resumeDetails.linkedinURL + "/" + this.resumeDetails.websiteURL
              resumeRequest = resumeRequest + " OBJECTIVE " +  this.resumeDetails.professionalSummary + " EDUCATION " 

              if(this.resumeDetails.educationDetails != null && this.resumeDetails.educationDetails.length > 0){
                this.resumeDetails.educationDetails.forEach(edu => {
                  resumeRequest = resumeRequest + " " + edu.instituteName + " ," + edu.location + " " + edu.startDate + "-" + edu.endDate + " " + edu.degree + " GPA: " + edu.gpa + " Courses: " + edu.courses.toString()
                });
              }
              else{
                return
              }
              
              if(this.resumeDetails.leadershipDetails != null && this.resumeDetails.leadershipDetails.length > 0){
                resumeRequest = resumeRequest + " LEADERSHIP (or WORK EXPERIENCE, ACTIVITIES, VOLUNTEER WORK) "
                this.resumeDetails.leadershipDetails.forEach(leadership => {
                  resumeRequest = resumeRequest + " " + leadership.orgName + " " + leadership.startDate + "-" + leadership.endDate + " " + leadership.leadershipPosition + " " + leadership.leadershipNotes.toString()
                });
              }
              else{
                return
              }

              if(this.resumeDetails.experienceDetails != null && this.resumeDetails.experienceDetails.length > 0){
                resumeRequest = resumeRequest + " WORK EXPERIENCE (or LEADERSHIP, ACTIVITIES, VOLUNTEER WORK) "
                this.resumeDetails.experienceDetails.forEach(experience => {
                  resumeRequest = resumeRequest + " " + experience.orgName + " ," + experience.roleName + " ," + experience.location + " Date(" + experience.startDate + "-" + experience.endDate + ") \n" + experience.experienceNotes.toString()
                });
              }
              else{
                return
              }

              if(this.resumeDetails.honorDetails != null && this.resumeDetails.honorDetails.length > 0){
                resumeRequest = resumeRequest + " HONORS (and/or AWARDS) "
                this.resumeDetails.honorDetails.forEach(honor => {
                  resumeRequest = resumeRequest + " " + honor.name + "/" + honor.honorOrg + " " + honor.startDate + "-" + honor.endDate + " " + honor.honorNotes.toString()
                });
              }
              else{
                return
              }
              
              if(this.resumeDetails.skills != null && this.resumeDetails.skills.length > 0){
                resumeRequest = resumeRequest + " SKILLS "
                this.resumeDetails.skills.forEach(skill => {
                  resumeRequest = resumeRequest + " " + skill.name + " : " + skill.level + "\n"
                });
              }
              else{
                return
              }
              break;
            default:
              break; 
          }

          var aiMessage = "Can you give me only the Match score percent without any text for below job description and resume details? Job Description: " + this.resumeDetails.jobdescription + "\n" + resumeRequest
          try{
            const cohere = new CohereClient({
              token: "XtLnyRvwWZxsq2YXfHqIAsSXtdFlwvQwWSGC1BAz",
            });

            await cohere.chat({
              chatHistory: [],
              message: aiMessage,
              connectors: [{ id: 'web-search' }]
            }).then((response)=> {
                console.log(response)
                if(response.text != null){
                  console.log(response.text)
                  this.matchScore = response.text
                }
                this.setLoadingOverLay(false, "")
              })
          }
          catch(err){
            console.log(err)
            this.setLoadingOverLay(false, "")
          } 
        },

        exportToPDF() {
          this.opt.filename = this.resumeTitle != "" ? this.resumeTitle + ".pdf" : "myresume.pdf"
          var currentTemplate = ""
          switch(this.tempalte){
            case "Template 1": currentTemplate = "template1ResumePDF" 
            break;
            case "Template 2": currentTemplate = "template2ResumePDF" 
            break;
            case "Template 3": currentTemplate = "template3ResumePDF" 
            break;
            case "Template 4": currentTemplate = "template4ResumePDF" 
            break;
            default: currentTemplate = "template1ResumePDF" 
            break; 
          }
          html2pdf().set(this.opt).from(document.getElementById(currentTemplate)).save()
        }
      },
      watch: {
        
      },
      beforeMount(){
        this.onLoad()
      }
    }
  </script>