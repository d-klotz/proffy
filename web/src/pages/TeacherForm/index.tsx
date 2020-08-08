import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import iconWarning from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../services/api';

const TeacherForm: React.FC = () => {

  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ]);

  const addNewScheduleItem = () => {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ]);
  }

  const setScheduleItemValue = (position: number, field: string, value: string) => {
    	const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
        if (index === position) {
          return { ...scheduleItem, [field]: value}
        }

        return scheduleItem;
      });

      setScheduleItems(updatedScheduleItems);
  }

  const handleCreateClass = (e: FormEvent) => {
    e.preventDefault();

    api.post('/classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems 
    }).then(res => {
      alert('Your classes have been saved!');
      history.push('/');
    });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Teaching someone is the best way to learn" 
        description="The first step is to create your profile"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Your data</legend>
            <Input 
              name="name" 
              label="Name"
              value={name}
              onChange={(e) => {setName(e.target.value)}}
            />
            <Input 
              name="avatar" 
              label="Avatar"
              value={avatar}
              onChange={(e) => { setAvatar(e.target.value)}}
            />
            <Input 
              name="whatsapp" 
              label="Whatsapp"
              value={whatsapp}
              onChange={(e) => { setWhatsapp(e.target.value)}}            
            />
            <TextArea 
              name="bio" 
              label="Bio"            
              value={bio}
              onChange={(e) => { setBio(e.target.value)}} 
            />
          </fieldset>

          <fieldset>
            <legend>About your class</legend>
              <Select 
                name="subject" 
                label="Subject"
                value={subject}
                onChange={(e) => { setSubject(e.target.value)}}
                options={[
                  {value: 'arts', label: 'Arts'},
                  {value: 'math', label: 'Math'},
                  {value: 'programming', label: 'Programming'},
                  {value: 'english', label: 'English'},
                  {value: 'cooking', label: 'Cooking'},
                  {value: 'physics', label: 'Physics'}
                ]}
              />
              <Input 
                name="cost" 
                label="Price of your class"
                value={cost}
                onChange={(e) => { setCost(e.target.value)}}
              />
          </fieldset>

          <fieldset>
            <legend>
              Time table
              <button type="button" onClick={addNewScheduleItem}>+ New slot</button>
            </legend>

          {scheduleItems.map((scheduleItem, index) => {
            return (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select 
                  name="week_day" 
                  label="Weekday"
                  value={scheduleItem.week_day}
                  onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                  options={[
                    {value: '0', label: 'Monday'},
                    {value: '1', label: 'Thusday'},
                    {value: '2', label: 'Wednesday'},
                    {value: '3', label: 'Thursday'},
                    {value: '4', label: 'Friday'},
                    {value: '5', label: 'Saturday'},
                    {value: '6', label: 'Sunday'}
                  ]}
                />
                <Input 
                  name="from" 
                  label="From" 
                  type="time"      
                  value={scheduleItem.from}            
                  onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                />
                <Input 
                  name="to" 
                  label="To" 
                  type="time"
                  value={scheduleItem.to}
                  onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                />
              </div>
            );
          })}

          </fieldset>

          <footer>
            <p>
              <img src={iconWarning} alt="important"/>
              Important! <br />
              Fill all the fields
            </p>
            <button type="submit">
              Save
            </button>
          </footer>
        
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;