import User from '../../models/user.js'

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}

// Create a user
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ msg: 'User already exists' })
    }
    user = new User({
      name,
      email,
      password,
    })
    await user.save()
    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}

// Update a user
export const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    let user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }
    user.name = name || user.name
    user.email = email || user.email
    user.password = password || user.password
    await user.save()
    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }
    await user.remove()
    res.json({ msg: 'User removed' })
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}
