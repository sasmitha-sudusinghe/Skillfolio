import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    // --- Auth fields ---
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
      match: [/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, hyphens, and underscores'],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: function () {
        return !this.githubId;
      },
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },
    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },

    // --- Profile fields ---
    displayName: {
      type: String,
      trim: true,
      maxlength: [60, 'Display name cannot exceed 60 characters'],
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [280, 'Bio cannot exceed 280 characters'],
      default: '',
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      trim: true,
      maxlength: [100, 'Location cannot exceed 100 characters'],
      default: '',
    },
    website: {
      type: String,
      trim: true,
      default: '',
    },
    githubUrl: {
      type: String,
      trim: true,
      default: '',
    },
    linkedinUrl: {
      type: String,
      trim: true,
      default: '',
    },

    isPublic: {
      type: Boolean,
      default: true,
    },

    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// FIXED: async pre-save hooks in modern Mongoose don't receive a `next`
// callback - just omit it and let the promise resolve on its own.
UserSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

UserSchema.virtual('projectCount').get(function () {
  return this.projects ? this.projects.length : 0;
});

UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

const User = mongoose.model('User', UserSchema);

export default User;