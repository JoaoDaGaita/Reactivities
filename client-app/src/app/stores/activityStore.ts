import { action, observable, computed } from "mobx";
import { createContext } from "react";
import Activities from "../api/agent";
import { IActivity } from "../models/activity";
import {makeObservable} from 'mobx';


class ActivityStore {

    constructor() {
        makeObservable(this);
    }

    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;
    @observable selectedActivity: IActivity | undefined;
    @observable editMode = false;
    @observable submiting = false;

    @computed get activitiesByDate() {
      return this.activities.slice().sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
          const activities = await Activities.list();
          activities.forEach((activity) => {
            activity.date = activity.date.split(".")[0];
            this.activities.push(activity);
          });
          this.loadingInitial = false;
        } catch (error) {
          console.log(error);
          this.loadingInitial = false;
        }
    }

    @action createActivity = async (activity: IActivity) => {
      this.submiting = true;
      try {
        await Activities.create(activity);
        this.activities.push(activity);
        this.editMode = false;
        this.submiting = false;
      } catch (error) {
        console.log(error);
        this.submiting = false;
      }
    }

    @action openCreateForm = () => {
      this.editMode = true;
      this.selectedActivity = undefined;
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(a => a.id === id);
        this.editMode = false;
    }

}

export default createContext(new ActivityStore());