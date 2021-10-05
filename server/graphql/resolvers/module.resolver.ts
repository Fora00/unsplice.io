import Module from '../../models/module.model';
import Program from '../../models/program.model';

export default {
  Query: {
    getModuleList: async (_: any, { programId } : any) => {
      const program = await Program.findById(programId); // ["cs1", "cs2", "cs3"]

      // Find module where code is ["cs1", "cs2", "cs3"]
      const modules = await Module.find({
        moduleCode: {
          $in: program.moduleCodes,
        },
      });

      return modules;
    },
    getModule: async (_: any, { moduleId }: any) => {
      const module = await Module.findById(moduleId);
      return module;
    },
  },
  Mutation: {
    createModule: async (_: any, { moduleInput: { programId, name, moduleCode, desc } }: any) => {
      // TODO: Validate user Input

      // Update program's module code array
      const updatedProgram = await Program.update({ _id: programId }, { $push: { moduleCodes: moduleCode } });

      // create module
      const newModule = await Module.create({
        name,
        moduleCode,
        desc,
        progress: 0,
        contents: [],
        createdAt: new Date().toISOString(),
      });

      return newModule;
    },
  },
};
