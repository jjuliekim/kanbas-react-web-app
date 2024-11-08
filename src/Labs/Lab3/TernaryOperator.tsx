let loggedIn = true;
export default function TernaryOperator() {
    return (
        // Ternary operators take 3 arguments
        // predicate ? = evaluates true or false
        // expression that evaluates if predicate is true :
        // expression that evaluates iff the predicate is false
        <div id="wd-ternary-operator">
            <h4>Logged In</h4>
            {loggedIn ? <p>Welcome</p> : <p>Please login</p>} <hr />
        </div>
    );
}
