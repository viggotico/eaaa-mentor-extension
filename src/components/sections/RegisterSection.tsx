'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { ApiFrontend } from "@/services/api/ApiFrontend";
import { Section } from "@/components/Section";
import { AvailabilityComponent, User } from "@/types/api";
import { MeetingType, UddannelseType } from "@/types/api/collections/User";
import { Form } from "../input/Form";
import { InputText } from "../input/InputText";
import { InputButtons } from "../input/InputButtons";
import { InputSelectGroup } from "../input/InputSelectGroup";
import { InputTagGroup } from "../input/InputTagGroup";
import { InputTimeTable } from "../input/InputTimeTable";
import { InputDropzone } from "../input/InputDropzone";
import { goHome } from "@/services/StringUtilsFront";
import styles from "./RegisterSection.module.css";

interface LoginSectionProps {
  type: User['type'];
}

class RegisterError {
  static msg: string | undefined;
}

export const RegisterSection = ({ type }: LoginSectionProps) => {
  const isMentor = type === 'Mentor';
  const oppositeType = type === 'Mentor' ? 'Mentee' : 'Mentor';
  const [isValidCode, setIsValidCode] = useState<boolean>(isMentor ? false : true);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

  useEffect(() => {
    setErrorMsg(RegisterError.msg);
    if (!RegisterError.msg) return;
    alert(RegisterError.msg);
  }, [RegisterError.msg]);
  
  return (
    <Section
      visibility='PublicOnly'
      bgColor={
        isValidCode ?
          '--secondary-color-butter-yellow: #f4ebc0' :
          '--secondary-color-quiet-gray: #f3f4f7'
      }

    >
      {/* Skriv dit indhold herinde */}
      <h1>Opret dig som {type.toLowerCase()}</h1>
      <p>Har du allerede en konto? <Link href={`/login`}><u>Login</u></Link>.</p>
      <p>Eller vil du oprette dig som {oppositeType.toLowerCase()}? <Link href={`/register/${oppositeType.toLowerCase()}`}><u>Klik her</u></Link>.</p>
      {
        !isValidCode ?
          <Form action={(formData) => {
            const code = formData.get('onetimecode');
            if (!code) return;
            console.log('code:', code);
            setIsValidCode(true);
          }}>
            <InputText
              type='password'
              name='onetimecode'
              label='Engangskode'
              required={true}
              description='Du skal godkendes af din lektor for at få tilladelse til at oprette dig som mentor. Indtast venligst den engangskode, som du har fået af din lektor.'
            />
            <div className='group-row'>
              <InputButtons type='submit' label='Gå videre' />
            </div>
          </Form>
          :
          <Form action={async (formData) => {
            const file = formData.get('files') as Blob;
            const email = formData.get('email') as string;
            const name = formData.get('fname') as string;
            const surname = formData.get('lname') as string;
            const description = formData.get('description') as string;
            const age = formData.get('age') as string;
            const subject = formData.get('subject') as string;
            const uddannelse = formData.get('uddannelse') as UddannelseType;
            const semester = formData.get('semester') as string;
            const password = formData.get('password') as string;

            const skills = isMentor ? (formData.getAll('skills') as string[]) : undefined;
            const timetable = isMentor ? (formData.getAll('timetable') as string[]) : undefined;
            let meetingType = isMentor ? (formData.get('meetingtype') as MeetingType) : undefined;
            let availability: AvailabilityComponent[] | undefined = undefined;

            if (isMentor) {
              switch (meetingType as any) {
                case 'Fysisk': meetingType = 'Physical'; break;
                case 'Online': meetingType = 'Online'; break;
                case 'Begge': meetingType = 'Both'; break;
              }

              // timetable
              // availability
            }

            ApiFrontend.auth.register({
              email,
              name,
              surname,
              description,
              age: age ? parseInt(age) : undefined,
              skills: skills?.join(', '),
              subject,
              type,
              uddannelse,
              semester,
              acceptingMentees: false,
              meetingType,
              availability,
              password
            }).then(user => {
              if (user) {
                RegisterError.msg = undefined;
                console.log('Successfully logged in as', `${user.name}!`);
                const avatarFormData = new FormData();
                avatarFormData.append('files', file);
                avatarFormData.append('ref', 'plugin::users-permissions.user');
                avatarFormData.append('refId', `${user.id}`);
                avatarFormData.append('field', 'avatar');
                ApiFrontend.upload.entryFileFormData(avatarFormData)
                  .then(media => {
                    RegisterError.msg = undefined;
                    console.log('Successfully updated', `${user.name}'s avatar!`, media[0]);
                    goHome();
                  }).catch(e => {
                    RegisterError.msg = `Failed to set user avatar. ${e.message}`;
                    goHome();
                  });
              } else {
                RegisterError.msg = 'Failed to create user due to invalid user data.';
                console.error(RegisterError.msg);
              }
            }).catch(err => {
              RegisterError.msg = err.message;
              alert(err.message);
            });
          }}>
            <InputText
              type='fname'
              name='fname'
              label='Navn'
              required={true}
              placeholder='John'
            />
            <InputText
              type='lname'
              name='lname'
              label='Efternavn'
              required={true}
              placeholder='Doe'
            />
            <InputText
              type='number'
              name='age'
              label='Alder'
              required={true}
              placeholder='23'
              min='15'
              max='99'
            />
            <InputDropzone
              name='files'
              label='Profilbillede'
              required={true}
              description='Vælg venligst et profilbillede.'
              dropDescription={`Drag 'n' drop nogle filer her`}
            />
            <InputSelectGroup
              id='register-education'
              type='radio'
              name='uddannelse'
              label='Uddannelse'
              required={true}
              description='Vælg din nuværende uddannelse.'
              items={[
                {
                  id: 'register-education-option-Datamatiker',
                  label: 'Datamatiker',
                },
                {
                  id: 'register-education-option-Multimediedesigner',
                  label: 'Multimediedesigner',
                },
                {
                  id: 'register-education-option-Finansøkonom',
                  label: 'Finansøkonom',
                },
                {
                  id: 'register-education-option-Finansbachelor',
                  label: 'Finansbachelor',
                },
                {
                  id: 'register-education-option-Markedsføringsøkonom',
                  label: 'Markedsføringsøkonom',
                },
              ]}
            />
            <InputSelectGroup
              id='register-semester'
              type='radio'
              name='semester'
              label='Semester'
              required={true}
              description='Vælg din nuværende semester.'
              items={new Array(10).fill(0).map((x, i) => ({
                id: `register-semester-${i + 1}`,
                label: `${i + 1}. semester`,
              }))}
            />
            <InputText
              type='text'
              name='subject'
              label='Fag'
              required={true}
              placeholder='Frontend'
            />
            {
              isMentor && isValidCode ?
                <>
                  <InputTagGroup
                    label='Færdigheder'
                    name='skills'
                    description='Tilføj dine færdigheder.'
                    required={true}
                  />
                  <InputText
                    type='text'
                    name='description'
                    label='Hvad kan du tilbyde dine mentees og hvorfor vil du gerne være mentor?'
                    required={true}
                    isTextArea={true}
                    placeholder='...'
                  />
                  <InputSelectGroup
                    id='register-meetingtype'
                    type='radio'
                    name='meetingtype'
                    label='Mødetype'
                    required={true}
                    description='Hvordan foretrækker du at undervise din mentees?'
                    items={[
                      {
                        id: 'register-meetingtype-option-Physical',
                        label: 'Physical',
                      },
                      {
                        id: 'register-meetingtype-option-Online',
                        label: 'Online',
                      },
                      {
                        id: 'register-meetingtype-option-Both',
                        label: 'Both',
                      },
                    ]}
                  />
                  <InputTimeTable
                    label='Din tidstabel'
                    name='timetable'
                    description='Vælg hvilke tidspunkter du primært har tid til, at hjælpe dine mentees. Du kan også vælge hvilke dage du ikke er tilgængelig. Dette giver et bedre overblik på hvornår dine mentees kan forvente at få hjælp, før de booker dig.'
                    required={true}
                  />
                </>
                : <>
                  <InputText
                    type='text'
                    name='description'
                    label='Hvorfor vil du gerne være mentee og hvad er dine udfordringer?'
                    required={true}
                    isTextArea={true}
                    placeholder='...'
                  />
                </>
            }
            <InputText
              type='email'
              name='email'
              label='Email'
              required={true}
              placeholder='example@mentorordning.dk'
            />
            <InputText
              type='email'
              name='emailrepeat'
              label='Gentag email'
              required={true}
              placeholder='example@mentorordning.dk'
            />
            <InputText
              type='password'
              name='password'
              label='Adgangskode'
              placeholder='••••••••••'
              required={true}
              min='4'
              max='50'
            />
            <InputText
              type='password'
              name='passwordrepeat'
              label='Gentag adgangskode'
              placeholder='••••••••••'
              required={true}
              min='4'
              max='50'
            />
            <div className='group-row'>
              <InputButtons type='submit' label='Opret konto' />
            </div>
            {errorMsg ? <p style={{ color: 'rgb(179, 56, 56)' }}>{errorMsg}</p> : <></>}
          </Form>
      }
    </Section>
  );
}
