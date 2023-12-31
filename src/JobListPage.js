import React from "react";
import { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import JobList from "./JobList";
import { JoblyApi } from "./api";

/** Fetches data for all jobs and renders JobList and SearchForm.
 *
 * State:
 * - jobs: object like { data: [{Job1}, {Job22}, ... ], isLoading: false }
 *
 * RouteList -> JobListPage -> { JobList, SearchForm }
 */
function JobListPage() {
  const [jobs, setJobs] = useState({
    data: null,
    isLoading: true
  });

  useEffect(function fetchJobsWhenMounted() {
    async function fetchJobs() {
      search();
    }
    fetchJobs();
  }, []);

  async function search(term) {
    const filteredJobs = await JoblyApi.getJobs(term);
    setJobs({
      data: filteredJobs,
      isLoading: false
    });
  }

  if (jobs.isLoading) return <i>Loading...</i>;

  return (
    <div className="JobListPage">
      <SearchForm search={search} />
      {jobs.data.length !== 0
        ? <JobList jobs={jobs.data} />
        : <i>No matching job found.</i>
      }
    </div>
  );
}

export default JobListPage;