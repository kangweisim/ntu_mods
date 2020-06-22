
const SALUTATIONS = [{ label: "Mr.", value: "Mr." }, { label: "Ms.", value: "Ms." }, { label: "Mdm.", value: "Mdm." }, { label: "Dr.", value: "Dr." }, { label: "Mrs.", value: "Mrs." }];
const GENDERS = [{ label: "Male", value: "male" }, { label: "Female", value: "female" }];
const KEY_LOCAL_SAVE = "ntu-mods-local-save";
const INIT_MODULES_FILTER = {
  limit: 10,
  offset: 0,
  search: "",
  count: 0
}
export default { SALUTATIONS, GENDERS, KEY_LOCAL_SAVE, INIT_MODULES_FILTER };