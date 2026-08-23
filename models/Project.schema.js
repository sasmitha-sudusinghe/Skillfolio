import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [80, 'Title cannot exceed 80 characters'],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters'],
      default: '',
    },

    techStack: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return arr.length <= 10;
        },
        message: 'You can add up to 10 technologies',
      },
    },

    status: {
      type: String,
      enum: ['planned', 'in-progress', 'done'],
      default: 'planned',
    },

    repoUrl: {
      type: String,
      trim: true,
      default: '',
    },

    liveUrl: {
      type: String,
      trim: true,
      default: '',
    },

    writeUpUrl: {
      type: String,
      trim: true,
      default: '',
    },

    commitHash: {
      type: String,
      trim: true,
      default: '',
    },

    year: {
      type: Number,
      min: 2000,
      max: 2100,
      default: () => new Date().getFullYear(),
    },

    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

ProjectSchema.index({ owner: 1, createdAt: -1 });

const Project = mongoose.model('Project', ProjectSchema);

export default Project;