import { useState, useEffect, type ReactNode } from "react";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from 'react-icons/fi';
import { jsonGet, jsonPost, jsonPatch, jsonDelete } from "../../api/client";
import { type NavItem, type NavResponse } from "../routes/types/routes";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

interface TableColumn<T> {
  label: string;
  render: (rowData: T) => ReactNode;
  header?: () => ReactNode;
  headerClassName?: string;
}

type RouteFormData = Omit<NavItem, 'id'>;
const INITIAL_FORM_STATE: RouteFormData = { name: '', route: '', icon: '' };

function Routes() {
  const [routes, setRoutes] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'remove' | null>(null);
  const [activeRoute, setActiveRoute] = useState<NavItem | null>(null);
  const [formData, setFormData] = useState<RouteFormData>(INITIAL_FORM_STATE);

  const fetchRoutes = async () => {
    try {
      const data = await jsonGet<NavResponse>('/routes');
      setRoutes(data.navigation);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const renderIcon = (iconName: string) => {
    const IconComponent = (FiIcons as any)[iconName] || (FaIcons as any)[iconName];
    return IconComponent ? <IconComponent className="table-icon" /> : <FaIcons.FaCircle className="table-icon" />;
  };

  const handleOpenAdd = () => {
    setFormData(INITIAL_FORM_STATE);
    setModalType('add');
  };

  const handleOpenEdit = (route: NavItem) => {
    setActiveRoute(route);
    setFormData({ name: route.name, route: route.route, icon: route.icon });
    setModalType('edit');
  };

  const handleOpenRemove = (route: NavItem) => {
    setActiveRoute(route);
    setModalType('remove');
  };

  const closeModal = () => {
    if (loading) return;
    setModalType(null);
    setActiveRoute(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (modalType === 'add') {
        await jsonPost('/routes', formData);
      } else if (modalType === 'edit' && activeRoute) {
        await jsonPatch(`/routes/${activeRoute.id}`, formData);
      }
      closeModal();
      await fetchRoutes();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!activeRoute) return;
    setLoading(true);
    try {
      await jsonDelete(`/routes/${activeRoute.id}`);
      closeModal();
      await fetchRoutes();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const routeFormFields = (
    <div className="d-flex flex-column gap-1">
      <div>
        <label className="form-label">Nazwa</label>
        <input
          type="text"
          className="form-control form-input"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label className="form-label">Ścieżka</label>
        <input
          type="text"
          className="form-control form-input"
          required
          value={formData.route}
          onChange={(e) => setFormData({ ...formData, route: e.target.value })}
        />
      </div>
      <div>
        <label className="form-label">Ikona</label>
        <input
          type="text"
          className="form-control form-input"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
        />
      </div>
    </div>
  );

  const config: TableColumn<NavItem>[] = [
    {
      label: 'Nazwa',
      headerClassName: 'th-name',
      render: (route) => <span className="table-cell-bold">{route.name}</span>
    },
    {
      label: 'Ścieżka',
      headerClassName: 'th-route',
      render: (route) => <span className="table-cell-code">/{route.route}</span>
    },
    {
      label: 'Ikona',
      headerClassName: 'th-icon text-center',
      render: (route) => <div className="text-center">{renderIcon(route.icon)}</div>
    },
    {
      label: 'Akcje',
      headerClassName: 'w-0 text-center',
      render: (route) => (
        <div className="table-actions justify-content-end">
          <Button outline secondary size="sm" onClick={() => handleOpenEdit(route)} disabled={loading}>
            <FaIcons.FaPencilAlt />
          </Button>
          <Button outline danger size="sm" onClick={() => handleOpenRemove(route)} disabled={loading}>
            <FaIcons.FaTrash />
          </Button>
        </div>
      )
    },
  ];

  const renderSubmitButton = (label: string) => (
    <Button primary type={modalType === 'remove' ? 'button' : 'submit'} form="route-form" onClick={modalType === 'remove' ? handleConfirmDelete : undefined} disabled={loading}>
      {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
      {loading ? 'Przetwarzanie...' : label}
    </Button>
  );

  return (
    <div className="container-fluid mt-4">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h2 className="title">Zarządzanie Zakładkami</h2>
          <Button primary rounded onClick={handleOpenAdd} disabled={loading}>
            <FaIcons.FaPlus className="me-2" /> Dodaj nową
          </Button>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <Table data={routes} config={config} keyFn={(route) => route.id} />
        </div>
      </div>

      <Modal
        isOpen={modalType === 'add' || modalType === 'edit'}
        title={modalType === 'add' ? "Dodaj zakładkę" : "Edytuj zakładkę"}
        size="lg"
        preventCloseOutside
        onClose={closeModal}
        footer={
          <>
            {renderSubmitButton(modalType === 'add' ? 'Dodaj' : 'Zapisz')}
            <Button outline secondary onClick={closeModal} disabled={loading}>Anuluj</Button>
          </>
        }
      >
        <form id="route-form" onSubmit={handleSubmit}>{routeFormFields}</form>
      </Modal>

      <Modal
        isOpen={modalType === 'remove'}
        title="Usuń zakładkę"
        size="md"
        preventCloseOutside
        onClose={closeModal}
        footer={
          <>
            {renderSubmitButton('Usuń')}
            <Button outline secondary onClick={closeModal} disabled={loading}>Anuluj</Button>
          </>
        }
      >
        <p>Czy na pewno chcesz usunąć zakładkę <strong>{activeRoute?.name}</strong>?</p>
      </Modal>
    </div>
  );
}

export default Routes;
