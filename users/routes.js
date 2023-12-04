import * as dao from "./dao.js";
function UserRoutes(app) {
    const createUser = async (req, res) => {
        const currentUser = await dao.findUserByUsername(
            req.body.username);
        if (!req.body.username || !req.body.password) {
            return res.status(401).json({ message: "Username/password are required" });
        }
        if (currentUser) {
            return res.status(400).json(
                { message: "Username already taken" });
        }
        const user = await dao.createUser(req.body);
        res.json(user);
    };
    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };
    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };
    // const updateUser = async (req, res) => {
    //     const { userId } = req.params;
    //     const status = await dao.updateUser(userId, req.body);
    //     const currentUser = await dao.findUserById(userId);
    //     req.session['currentUser'] = currentUser;
    //     res.json(status);
    // };
    const updateUser = async (req, res) => {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "No user ID found" });
        }
        if (!req.body.username || !req.body.password) {
            return res.status(401).json({ message: "Username/password are required" });
        }
        try {
            const existingUser = await dao.findUserById(userId);
            if (!existingUser) {
                return res.status(404).json({ message: "User not found" });
            }
            const status = await dao.updateUser(userId, req.body);
            const updatedUser = await dao.findUserById(userId);
            req.session['currentUser'] = updatedUser;
            res.json(status);
        } catch (error) {
            res.status(500).json({ message: "An error occurred while updating the user", error: error.message });
        }
    };
    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(
            req.body.username);
        if (!req.body.username || !req.body.password) {
            return res.status(401).json({ message: "Username/password are required" });
        }
        if (user) {
            return res.status(400).json(
                { message: "Username already taken" });
        }
        const currentUser = await dao.createUser(req.body);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };
    const signin = async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username/password are required" });
        }
        try {
            const currentUser = await dao.findUserByCredentials(username, password);
            if (!currentUser) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            req.session['currentUser'] = currentUser;
            res.json(currentUser);
        } catch (error) {
            res.status(500).json({ message: "An error occurred while signing in", error: error.message });
        }
    };
    const signout = (req, res) => {
        req.session.destroy();
        res.json(200);
    };
    const account = async (req, res) => {
        res.json(req.session['currentUser']);
    };
    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/account", account);
}
export default UserRoutes;