export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor" className="container">
            <div>
                <label htmlFor="wd-name">Assignment Name</label>
                <input id="wd-name" className="form-control" value="A1 - ENV + HTML" />
            </div>
            <textarea id="wd-description" className="form-control mt-3 mb-3">
                The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.
            </textarea>

            <div className="row mb-3">
                <div className="col text-end">
                    <label htmlFor="wd-points" className="form-label p-1">Points</label>
                </div>
                <div className="col">
                    <input id="wd-points" className="form-control" value={100} />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col text-end">
                    <label htmlFor="wd-group" className="form-label">Assignment Group</label>
                </div>
                <div className="col">
                    <select id="wd-group" className="form-select">
                        <option value="Assignment">ASSIGNMENTS</option>
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col text-end">
                    <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
                </div>
                <div className="col">
                    <select id="wd-display-grade-as" className="form-select">
                        <option value="Percentage">Percentage</option>
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col text-end">
                    <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
                </div>
                <div className="col border p-3">
                    <select id="wd-submission-type" className="form-select mb-3">
                        <option value="Online">Online</option>
                    </select>
                    Online Entry Options
                    <div className="form-check mt-1">
                        <input type="checkbox" name="online-submission" id="wd-text-entry" className="form-check-input" />
                        <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" name="online-submission" id="wd-website-url" className="form-check-input" />
                        <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" name="online-submission" id="wd-media-recordings" className="form-check-input" />
                        <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" name="online-submission" id="wd-student-annotation" className="form-check-input" />
                        <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" name="online-submission" id="wd-file-upload" className="form-check-input" />
                        <label htmlFor="wd-file-upload" className="form-check-label">File Upload</label>
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col text-end">
                    <label htmlFor="wd-assign-to" className="form-label">Assign</label>
                </div>
                <div className="col border p-3">
                    <div className="mb-3">
                        <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
                        <select id="wd-assign-to" className="form-select">
                            <option value="Everyone">Everyone</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="wd-due-date" className="form-label">Due</label>
                        <input type="date" id="wd-due-date" className="form-control" value="2024-05-13" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="wd-available-from" className="form-label">Available from</label>
                        <input type="date" id="wd-available-from" className="form-control" value="2024-05-06" />
                    </div>
                    <div>
                        <label htmlFor="wd-available-until" className="form-label">Until</label>
                        <input type="date" id="wd-available-until" className="form-control" value="2024-05-20" />
                    </div>
                </div>
            </div>
            <hr className="mt-5"></hr>
            <div className="col mb-3 float-end">
                <div className="btn btn-secondary me-2">Cancel</div>
                <div className="btn btn-danger">Save</div>
            </div>
        </div>
    );
}
