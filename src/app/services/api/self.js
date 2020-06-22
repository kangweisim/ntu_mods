import { get_api_path } from "./api";
import { sessioned_client } from "./auth";
import { store } from "../../store";

export async function employment_summary() {
  const url = get_api_path("self/employment");
  const { token } = store.getState().profile;
  const response = await sessioned_client(token).get(url);
  const { model } = response.data.result;
  return { model };
};
export async function list_payslips({ query }) {
  const url = get_api_path("self/payslip/list", query);
  const { token } = store.getState().profile;
  const response = await sessioned_client(token).get(url);
  const { models, meta } = response.data.result;
  return { models, meta };
};
export async function payslip_detail({ payslipId: payroll_item_id }) {
  const url = get_api_path("self/payslip/detail", {}, { payroll_item_id });
  const { token } = store.getState().profile;
  const response = await sessioned_client(token).get(url);
  const { model } = response.data.result;
  return { model };
};