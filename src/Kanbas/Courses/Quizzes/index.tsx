export default function Quizzes() {
    return (
        <div id="wd-quizzes">
        <input id="wd-search-quiz"
               placeholder="Search for Quiz" />
        {/* <button id="wd-add-quiz-group">+ Group</button> */}
        <button id="wd-add-quiz">+ Quiz</button>
        <ul id="wd-quiz-list">
          <li className="wd-quiz-list-item">
            <a className="wd-quiz-link"
              href="#/Kanbas/Courses/1234/Quizzes/123">
              Q1 - HTML
            </a>
          </li>
          <li className="wd-quiz-list-item">
            <a className="wd-quiz-link"
              href="#/Kanbas/Courses/1234/Quizzes/124">
              Q2 - CSS
            </a>
          </li>
        </ul>
      </div>
    );
}