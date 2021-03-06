import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card, Image, Segment, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import ActivityStore from "../../../app/stores/activityStore";

interface IProps {  
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDetails: React.FC<IProps> = ({ setEditMode, setSelectedActivity }) => {
  const activityStore = useContext(ActivityStore);
  const {selectedActivity: activity} = activityStore;
  return (
    <Segment>
      <Card fluid>
        <Image
          src={`/assets/categoryImages/${activity!.category}.jpg`}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>{activity!.title}</Card.Header>
          <Card.Meta>
            <span className="date">{activity!.date}</span>
          </Card.Meta>
          <Card.Description>{activity!.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group>
            <Button
              onClick={() => setEditMode(true)}
              basic
              color="blue"
              content="Edit"
            />
            <Button
              onClick={() => setSelectedActivity(null)}
              basic
              color="grey"
              content="Cancel"
            />
          </Button.Group>
        </Card.Content>
      </Card>
    </Segment>
  );
};

export default observer(ActivityDetails);
