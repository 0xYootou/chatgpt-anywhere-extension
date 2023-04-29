import {
  Modal,
  Input,
  Dropdown,
  Button,
  Text,
  Divider,
  Checkbox,
  Tooltip,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { IConfig, restoreConfig, setConfig } from '../stores/Config';
import { getLang } from '../utils/getLang';

export function ConfigComponent(props: {
  settingVisible: boolean;
  onClose: () => void;
  onSubmit: (o: IConfig) => void;
}) {
  const [apikey, setApikey] = useState('');
  const [model, setModel] = useState<'gpt-3.5-turbo' | 'gpt-4'>(
    'gpt-3.5-turbo',
  );
  const [temperature, setTemperature] = useState(0.6);
  const [_memoryLength, _setMemoryLength] = useState(4);
  const [baseURL, setBaseURL] = useState('https://pro.gptnow.pro');

  /**searchOnGoogle: boolean;
  searchOnBing: boolean;
  searchOnBaidu: boolean; */
  const [searchOnGoogle, setSearchOnGoogle] = useState(true);
  const [searchOnBing, setSearchOnBing] = useState(true);
  const [searchOnBaidu, setSearchOnBaidu] = useState(true);

  const [searchOn, setSearchOn] = useState(true);
  const [selectionOn, setSelectionOn] = useState(true);
  const [domainOn, setDomainOn] = useState(true);

  const [emoji, setEmoji] = useState('');
  async function updateConfig() {
    const newConfig = {
      openai_key: apikey,
      model2: model,
      temperature: temperature,
      memorylength: _memoryLength,
      baseurl: baseURL,
      emoji: emoji,
      searchOnGoogle: searchOnGoogle,
      searchOnBing: searchOnBing,
      searchOnBaidu: searchOnBaidu,
      searchOn,
      selectionOn,
      domainOn,
    };
    await setConfig(newConfig);
    props.onSubmit(newConfig);
  }
  async function initConfigFromLocal() {
    const config = await restoreConfig();

    setApikey(config.openai_key);
    setModel(config.model2);
    setTemperature(config.temperature);
    _setMemoryLength(config.memorylength);
    setBaseURL(config.baseurl);
    setEmoji(config.emoji);
    setSearchOnGoogle(config.searchOnGoogle);
    setSearchOnBing(config.searchOnBing);
    setSearchOnBaidu(config.searchOnBaidu);
    setSearchOn(config.searchOn);
    setSelectionOn(config.selectionOn);
    setDomainOn(config.domainOn);
  }

  useEffect(() => {
    if (props.settingVisible) initConfigFromLocal();
  }, [props.settingVisible]);
  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={props.settingVisible}
      onClose={() => {
        props.onClose();
      }}
      width="450px"
      css={{
        zIndex: 9999999999,
      }}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Setting
        </Text>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            paddingTop: '15px',
          }}
        >
          <Input
            color="primary"
            size="sm"
            labelPlaceholder="API Key"
            style={{
              textAlign: 'left',
            }}
            fullWidth={true}
            value={apikey}
            onChange={(e) => {
              setApikey(e.target.value);
            }}
          />
        </div>
        <div
          style={{
            paddingTop: '15px',
          }}
        >
          <Input
            color="primary"
            size="sm"
            labelPlaceholder="Proxy Base URL"
            style={{
              textAlign: 'left',
            }}
            fullWidth={true}
            value={baseURL}
            onChange={(e) => {
              setBaseURL(e.target.value);
            }}
          />
        </div>
        <Divider />
        <div
          style={{
            paddingTop: '15px',
          }}
        >
          <Checkbox.Group
            size="sm"
            value={[
              searchOn ? 'search' : '',
              selectionOn ? 'selection' : '',
              domainOn ? 'domain' : '',
            ].filter((e) => e !== '')}
            label={getLang('config_functions')}
            onChange={(e) => {
              setSearchOn(e.includes('search'));
              setSelectionOn(e.includes('selection'));
              setDomainOn(e.includes('domain'));
            }}
            orientation="horizontal"
          >
            <Checkbox value="search" size="sm">
              <a title={getLang('searchon_title')}>
                {getLang('searchon')}
                <svg
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2647"
                  width="18"
                  height="18"
                  style={{
                    verticalAlign: '-4px',
                  }}
                >
                  <path
                    d="M512 147.2C310.528 147.2 147.2 310.528 147.2 512S310.528 876.8 512 876.8 876.8 713.472 876.8 512 713.472 147.2 512 147.2z m0 64c166.144 0 300.8 134.656 300.8 300.8S678.144 812.8 512 812.8 211.2 678.144 211.2 512 345.856 211.2 512 211.2z"
                    p-id="2648"
                  ></path>
                  <path
                    d="M538.1888 596.1984v-7.168c0-12.3392 2.56-23.1168 7.68-33.3824 4.6336-9.2416 11.3152-17.9712 20.5568-25.6768 24.6272-21.5552 39.5264-35.4304 44.16-40.5504 12.288-16.4352 18.9952-37.4784 18.9952-63.1552 0-31.3344-10.2912-55.9616-30.8224-73.9328-20.5312-18.4832-47.744-27.2128-81.1008-27.2128-37.9904 0-67.7888 10.7776-89.856 32.3328-22.5792 21.5808-33.3824 51.3536-33.3824 89.344h58.5472c0-21.5552 4.096-38.5024 12.8256-50.304 9.7536-14.3872 25.6768-21.0688 48.256-21.0688 17.4592 0 31.3344 4.608 41.088 14.3872 9.216 9.7536 14.3616 23.0912 14.3616 40.0384 0 12.8512-4.608 25.1648-13.8496 36.4544l-6.1696 7.168c-33.3824 29.7984-53.4016 51.3536-60.0576 65.2288-7.1936 13.8496-10.2912 30.7968-10.2912 50.304v7.1936h59.0592zM508.416 698.88c11.264 0 20.5312-3.584 28.2368-10.7776 7.68-7.168 11.776-16.9472 11.776-28.2368 0-11.2896-4.096-20.5312-11.264-27.7248-7.7056-7.168-17.4592-10.7776-28.7488-10.7776-11.3152 0-20.5568 3.584-28.2368 10.752-7.7056 7.2192-11.3152 16.4608-11.3152 27.7504 0 11.2896 3.584 20.5312 11.3152 27.7248 7.68 7.168 16.9216 11.2896 28.2368 11.2896z"
                    p-id="2649"
                  ></path>
                </svg>
              </a>
            </Checkbox>
            <Checkbox value="selection" size="sm">
              <a title={getLang('selectionon_title')}>
                {getLang('selectionon')}
                <svg
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2647"
                  width="18"
                  height="18"
                  style={{
                    verticalAlign: '-4px',
                  }}
                >
                  <path
                    d="M512 147.2C310.528 147.2 147.2 310.528 147.2 512S310.528 876.8 512 876.8 876.8 713.472 876.8 512 713.472 147.2 512 147.2z m0 64c166.144 0 300.8 134.656 300.8 300.8S678.144 812.8 512 812.8 211.2 678.144 211.2 512 345.856 211.2 512 211.2z"
                    p-id="2648"
                  ></path>
                  <path
                    d="M538.1888 596.1984v-7.168c0-12.3392 2.56-23.1168 7.68-33.3824 4.6336-9.2416 11.3152-17.9712 20.5568-25.6768 24.6272-21.5552 39.5264-35.4304 44.16-40.5504 12.288-16.4352 18.9952-37.4784 18.9952-63.1552 0-31.3344-10.2912-55.9616-30.8224-73.9328-20.5312-18.4832-47.744-27.2128-81.1008-27.2128-37.9904 0-67.7888 10.7776-89.856 32.3328-22.5792 21.5808-33.3824 51.3536-33.3824 89.344h58.5472c0-21.5552 4.096-38.5024 12.8256-50.304 9.7536-14.3872 25.6768-21.0688 48.256-21.0688 17.4592 0 31.3344 4.608 41.088 14.3872 9.216 9.7536 14.3616 23.0912 14.3616 40.0384 0 12.8512-4.608 25.1648-13.8496 36.4544l-6.1696 7.168c-33.3824 29.7984-53.4016 51.3536-60.0576 65.2288-7.1936 13.8496-10.2912 30.7968-10.2912 50.304v7.1936h59.0592zM508.416 698.88c11.264 0 20.5312-3.584 28.2368-10.7776 7.68-7.168 11.776-16.9472 11.776-28.2368 0-11.2896-4.096-20.5312-11.264-27.7248-7.7056-7.168-17.4592-10.7776-28.7488-10.7776-11.3152 0-20.5568 3.584-28.2368 10.752-7.7056 7.2192-11.3152 16.4608-11.3152 27.7504 0 11.2896 3.584 20.5312 11.3152 27.7248 7.68 7.168 16.9216 11.2896 28.2368 11.2896z"
                    p-id="2649"
                  ></path>
                </svg>
              </a>
            </Checkbox>
            <Checkbox value="domain" size="sm">
              <a title={getLang('domainon_title')}>
                {getLang('domainon')}
                <svg
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2647"
                  width="18"
                  height="18"
                  style={{
                    verticalAlign: '-4px',
                  }}
                >
                  <path
                    d="M512 147.2C310.528 147.2 147.2 310.528 147.2 512S310.528 876.8 512 876.8 876.8 713.472 876.8 512 713.472 147.2 512 147.2z m0 64c166.144 0 300.8 134.656 300.8 300.8S678.144 812.8 512 812.8 211.2 678.144 211.2 512 345.856 211.2 512 211.2z"
                    p-id="2648"
                  ></path>
                  <path
                    d="M538.1888 596.1984v-7.168c0-12.3392 2.56-23.1168 7.68-33.3824 4.6336-9.2416 11.3152-17.9712 20.5568-25.6768 24.6272-21.5552 39.5264-35.4304 44.16-40.5504 12.288-16.4352 18.9952-37.4784 18.9952-63.1552 0-31.3344-10.2912-55.9616-30.8224-73.9328-20.5312-18.4832-47.744-27.2128-81.1008-27.2128-37.9904 0-67.7888 10.7776-89.856 32.3328-22.5792 21.5808-33.3824 51.3536-33.3824 89.344h58.5472c0-21.5552 4.096-38.5024 12.8256-50.304 9.7536-14.3872 25.6768-21.0688 48.256-21.0688 17.4592 0 31.3344 4.608 41.088 14.3872 9.216 9.7536 14.3616 23.0912 14.3616 40.0384 0 12.8512-4.608 25.1648-13.8496 36.4544l-6.1696 7.168c-33.3824 29.7984-53.4016 51.3536-60.0576 65.2288-7.1936 13.8496-10.2912 30.7968-10.2912 50.304v7.1936h59.0592zM508.416 698.88c11.264 0 20.5312-3.584 28.2368-10.7776 7.68-7.168 11.776-16.9472 11.776-28.2368 0-11.2896-4.096-20.5312-11.264-27.7248-7.7056-7.168-17.4592-10.7776-28.7488-10.7776-11.3152 0-20.5568 3.584-28.2368 10.752-7.7056 7.2192-11.3152 16.4608-11.3152 27.7504 0 11.2896 3.584 20.5312 11.3152 27.7248 7.68 7.168 16.9216 11.2896 28.2368 11.2896z"
                    p-id="2649"
                  ></path>
                </svg>
              </a>
            </Checkbox>
          </Checkbox.Group>
        </div>
        <Divider
          style={{
            marginBottom: '15px',
          }}
        />
        <div>
          <Checkbox.Group
            isDisabled={!searchOn}
            size="sm"
            value={[
              searchOnGoogle ? 'google' : '',
              searchOnBing ? 'bing' : '',
              searchOnBaidu ? 'baidu' : '',
            ].filter((e) => e !== '')}
            label="Search On"
            onChange={(e) => {
              setSearchOnGoogle(e.includes('google'));
              setSearchOnBing(e.includes('bing'));
              setSearchOnBaidu(e.includes('baidu'));
            }}
            orientation="horizontal"
          >
            <Checkbox value="google" size="sm">
              Google
            </Checkbox>
            <Checkbox value="bing" size="sm">
              Bing
            </Checkbox>
            <Checkbox value="baidu" size="sm">
              Baidu
            </Checkbox>
          </Checkbox.Group>
        </div>

        <Divider
          style={{
            marginBottom: '15px',
          }}
        />
        <Dropdown>
          <Dropdown.Trigger>
            <div
              style={{
                paddingTop: '15px',
              }}
            >
              <Input
                color="primary"
                size="sm"
                fullWidth={true}
                labelPlaceholder="Active Model"
                value={model}
                readOnly={true}
                style={{
                  textAlign: 'left',
                  textTransform: 'uppercase',
                }}
              />
            </div>
          </Dropdown.Trigger>
          <Dropdown.Menu
            color="secondary"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={model}
            onSelectionChange={(e) => {
              // console.log(e.currentKey);
              setModel((e as any).currentKey);
            }}
          >
            <Dropdown.Item key="gpt-3.5-turbo">GPT-3.5-TURBO</Dropdown.Item>
            <Dropdown.Item key="gpt-4">GPT-4</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div
          style={{
            paddingTop: '15px',
          }}
        >
          <Input
            type="number"
            min={0}
            max={1}
            step={0.1}
            color="primary"
            size="sm"
            fullWidth={true}
            labelPlaceholder="Temperature"
            style={{
              textAlign: 'left',
            }}
            value={temperature}
            onChange={(e) => {
              setTemperature(parseFloat(e.target.value));
            }}
          />
        </div>
        <div
          style={{
            paddingTop: '15px',
          }}
        >
          <Input
            fullWidth={true}
            type="number"
            min={0}
            max={10}
            step={1}
            color="primary"
            size="sm"
            labelPlaceholder="Memory Length"
            style={{
              textAlign: 'left',
            }}
            value={_memoryLength}
            onChange={(e) => {
              _setMemoryLength(parseFloat(e.target.value));
            }}
          />
        </div>
        <Divider
          style={{
            marginBottom: '15px',
          }}
        />
        <Dropdown>
          <Dropdown.Trigger>
            <div
              style={{
                paddingTop: '15px',
              }}
            >
              <Input
                color="primary"
                size="sm"
                fullWidth={true}
                labelPlaceholder="GPT emoji"
                value={emoji}
                readOnly={true}
                style={{
                  textAlign: 'left',
                  textTransform: 'uppercase',
                }}
              />
            </div>
          </Dropdown.Trigger>
          <Dropdown.Menu
            color="secondary"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={emoji}
            onSelectionChange={(e) => {
              // console.log(e.currentKey);
              setEmoji((e as any).currentKey);
            }}
          >
            <Dropdown.Item key="🤡">🤡</Dropdown.Item>
            <Dropdown.Item key="🤖">🤖</Dropdown.Item>
            <Dropdown.Item key="👽">👽</Dropdown.Item>
            <Dropdown.Item key="👻">👻</Dropdown.Item>
            <Dropdown.Item key="🧚‍♀️">🧚‍♀️</Dropdown.Item>
            <Dropdown.Item key="🧝‍♀️">🧝‍♀️</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>
      <Modal.Footer>
        <Button
          auto
          onPress={() => {
            updateConfig();
          }}
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
