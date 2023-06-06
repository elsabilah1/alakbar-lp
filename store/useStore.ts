import { create } from "zustand"

import createActivitySlice, { IActivityState } from "./slices/activitySlice"
import createAdminSlice, { IAdminState } from "./slices/adminSlice"
import createChildSlice, { IChildState } from "./slices/childSlice"
import createDonationSlice, { IDonationState } from "./slices/donationSlice"

const useStore = create<
  IAdminState & IChildState & IDonationState & IActivityState
>()((...a) => ({
  ...createAdminSlice(...a),
  ...createChildSlice(...a),
  ...createDonationSlice(...a),
  ...createActivitySlice(...a),
}))

export default useStore
